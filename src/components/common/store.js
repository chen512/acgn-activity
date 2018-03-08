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
        token: util.isInBrowser() && util.getUrlParam('token'),
        userInfo: DEFAULT_USERINFO,
    },
    mutations: {
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
