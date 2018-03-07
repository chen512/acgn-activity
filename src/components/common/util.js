let global = typeof window != 'undefined' ? window : (function() {return this})() || {};
let _isNative = global.callNative ? true : false;
export default {
	getQueryString: function(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	},
	isAndroid: function() {
		let agent = navigator.userAgent;
		let flag = false;
		if(agent.indexOf('Android') > -1 || agent.indexOf('Linux') > -1) {
			flag = true;
		}
		return flag;
	},
	isIOS: function() {
		let agent = navigator.userAgent;
		let flag = false;
		if(!!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
			flag = true;
		}
		return flag;
	},
	isNative: function() {
		return _isNative;
	},
	isObject: function(obj) {
		return obj !== null && typeof obj === 'object'
	},
	// 客户端接口
	/*登录接口 回调接口userInfo: function(token, avator, name)*/
	login: function() {
		if(this.isAndroid()) {
			callNative.login();
		} else if(this.isIOS()) {
			window.webkit.messageHandlers.login.postMessage(null)
		}
	},
	// 时间格式化
	/*formatDate(new Date(), 'yyyyMMdd-hhmmss')*/
	formatDate: function(format, date) {
	    var o = {
	        'M+': date.getMonth() + 1,
	        'd+': date.getDate(),
	        'h+': date.getHours(),
	        'm+': date.getMinutes(),
	        's+': date.getSeconds(),
	        'q+': Math.floor((date.getMonth() + 3) / 3),
	        'S': date.getMilliseconds()
	    };

	    if (/(y+)/.test(format)) {
	        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }

	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(format)) {
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
	                : ("00" + o[k]).substr(("" + o[k]).length));
	        }
	    }
	    return format;
	},
}
