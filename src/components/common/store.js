import Vue from 'vue'
import Vuex from 'vuex'
import util from 'components/common/util.js'

Vue.use(Vuex);

const DEFAULT_USERINFO = {
    "avatar": null,
    "name"  : null
}
export default new Vuex.Store({
    state: {
        // uid: '',
        token: util.getQueryString('token') || 0,
        userInfo: DEFAULT_USERINFO,
    },
    mutations: {
        /*setUid(state, uid) {
            state.uid = uid;
        },*/
        setToken(state, token) {
            state.token = token;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo || DEFAULT_USERINFO;
        }
    },
    action: {
    }
})
