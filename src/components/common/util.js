let global = typeof window != 'undefined' ? window : (function() {return this})() || {};
let _isNative = global.callNative ? true : false;
export default {
	getUrlParam(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	},
	isAndroid() {
		let agent = navigator.userAgent;
		let flag = false;
		if(agent.indexOf('Android') > -1 || agent.indexOf('Linux') > -1) {
			flag = true;
		}
		return flag;
	},
	isIOS() {
		let agent = navigator.userAgent;
		let flag = false;
		if(!!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
			flag = true;
		}
		return flag;
	},
	isInBrowser() {
		return typeof window != 'undefined';
	},
	isNative() {
		return _isNative;
	},
	isObject(obj) {
		return obj !== null && typeof obj === 'object'
	},
	// 客户端接口
	/*登录接口 回调接口userInfo: function(token, avator, name)*/
	login() {
		if(this.isAndroid()) {
			callNative.login();
		} else if(this.isIOS()) {
			window.webkit.messageHandlers.login.postMessage(null)
		}
	},
	formatDate(format, date) {
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
	installApp() {
		let url = {};
		let ua = navigator.userAgent.toLowerCase();
		if(ua.match(/android/i)){
		    url = {
		        open: 'lishijie://splash',
		        down: 'https://www.lishijie.net/download/android/lishijie.apk',
                store: 'market://search?q=里世界'
		    };
		}
		if(ua.match(/iphone|ipod|ipad/)){
		    url = {
		        open: 'lishijie://splash',
		    };
		}
		let winScreenWidth = window.screen.width;
		var iframe = document.createElement('iframe');
		var timer = null;
		var isInstalled = false;
		if(winScreenWidth < 800){
		    document.body.appendChild(iframe);
		    iframe.src = url.open;
		    iframe.style.display = 'none';
		    iframe.onload = function(e){
		        var e = e || window.event;
		        e.preventDefault();
		        isInstalled = true
		    }
		    iframe.onerror = function() {
		        isInstalled = false;
		    }
		    timer = setTimeout(function() {
		        document.body.removeChild(iframe);
		        if(!isInstalled){
		            window.location.href = url.store;
		        }
		    }, 200);
		} else {
		    window.location.href = 'https://www.lishijie.net/download/android/lishijie.apk'
		}
	}
}
