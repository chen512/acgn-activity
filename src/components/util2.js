let IN_BROWSER = typeof window != 'undefined';
export default {
    isInBrowser() {
		return IN_BROWSER
	},

    getUrlParam(key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },

	genId() {
		return Math.random().toString(36).substr(2);
	}
}
