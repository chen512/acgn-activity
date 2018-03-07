import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';
import Mixin from 'components/base/Mixin';
import Assit from 'components/base/Assit';
import 'components/common/motions';
import 'components/common/nativeinterface';
import store from 'components/common/store';

Vue.use(VueResource);
Vue.use(Assit); //can not change
Vue.mixin(Mixin); //can not change

Vue.http.interceptors.push(function(request, next) {
    request.timeout = 5000;
    store.commit('addPendingRequest', request);
    next(function(response) {
        store.commit('removePendingRequest', request);
    });
});

export function createApp() {
    return new Vue({
        name: 'Root',
        $global: true,
        render: h => h(App),
        store
    });
}


