import Vue from 'vue';
import App from './App.vue';


export function createApp() {
    return new Vue({
        name: 'Root',
        $global: true,
        render: h => h(App),
    });
}


