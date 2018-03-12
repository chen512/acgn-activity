<style lang="less">
    .banner {
        width: 100%;
        height: 19.546296rem;;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .author {
        width: 100%;
        height: 13.490741rem;
        background: url('../../assets/images/acgn-young/author-background.jpg');
        background-size: 100% 100%;
        text-align: center;
        div {
            position: relative;
            display: inline-block;
            width: 4.472222rem;
            height: 5.675926rem;
            margin-bottom: 0.4rem;
        }
        div:first-child {
            margin-right: 0.3rem;
        }
        div:nth-child(3) {
            margin-right: 0.3rem;
        }
        img {
            width: 100%;
            height: 100%;
        }
        .enter {
            display: block;
            position: absolute;
            z-index: 999;
            left: 50%;
            bottom: 12%;
            transform: translate3d(-50%, 0, 0);
            -webkit-transform: translate3d(-50%, 0, 0);
            width: 2.12963rem;
            height: 0.787037rem;
        }
    }
    .back-icon {
        position: fixed;
        top: 0.185185rem;
        left: 0.37037rem;
        width: 0.925926rem;
        height: 0.925926rem;
        background: url('../../assets/images/acgn-young/back-icon.png');
        background-size: 100% 100%;
    }
    .share-icon {
        position: fixed;
        top: 0.185185rem;
        right: 0.37037rem;
        width: 0.925926rem;
        height: 0.925926rem;
        background: url('../../assets/images/acgn-young/share-icon.png');
        background-size: 100% 100%;
    }
</style>
<template>
    <div class="young">
        <!-- 分享出去的页面，不显示token，去掉图标 -->
        <i class="back-icon" @click="goBack" v-if="sharePage"></i>
        <i class="share-icon" @click="shareWeb" v-if="sharePage"></i>
        <div class="banner">
            <img src="../../assets/images/acgn-young/banner.jpg">
        </div>
        <div class="author">
            <div>
                <img src="../../assets/images/acgn-young/author1.png">
                <img class="enter" src="../../assets/images/acgn-young/enter-btn.png" @click="viewArt('712')">
            </div>
            <div>
                <img src="../../assets/images/acgn-young/author2.png">
                <img class="enter" src="../../assets/images/acgn-young/enter-btn.png" @click="viewArt('1381')">
            </div>
            <div>
                <img src="../../assets/images/acgn-young/author3.png">
                <img class="enter" src="../../assets/images/acgn-young/enter-btn.png" @click="viewArt('1242')">
            </div>
            <div>
                <img src="../../assets/images/acgn-young/author4.png">
                <img class="enter" src="../../assets/images/acgn-young/enter-btn.png" @click="viewArt('965')">
            </div>
        </div>
        <Toast v-if="msg" :msg="toastMsg" :duration="toastDuration"></Toast>
    </div>
</template>
<script>
import {pageTracking, enterAuthorPageTracking} from 'common/api';
import util from 'common/util';
import Toast from 'business/Toast.vue';
export default {
    name: 'app',
    data() {
        return {
            shareDomain: 'http://www.lishijie.net', 
            toastMsg: '',
            toastDuration: 2000,
        }
    },
    computed: {
        sharePage() {
            let isShare = true;
            if(this.$store.state.token == null || !this.$store.state.token) {
                isShare = false
            }
            return isShare;
        },
        msg() {
            let show = false
            if(this.toastMsg) {
                show = true;
                setTimeout(() => {
                    this.toastMsg = ''
                }, 2000)
            } else {
                show = false
            }
            return show;
        },
    },
    mounted() {
        let param = {token: this.$store.state.token, contentId: 3};
        pageTracking(param).then((res) => {
           console.log(res + '页面PV UV');
        })
    },
    methods: {
        viewArt(authorId) {
            let param = {token: this.$store.state.token, 'authorId': authorId};
            enterAuthorPageTracking(param).then((res) => {
                console.log(res + '进入主页埋点');
            })
            if(this.sharePage) {
                this.enterAuthorPage(authorId);
            } else {
                this.openApp();
            } 
        },
        enterAuthorPage(authorId) {
            if (util.isAndroid()) {
                callNative.viewArt(authorId);
            } else if (util.isIOS()) {
                // window.webkit.messageHandlers.viewArt.postMessage({'authorId': authorId});
                callNative.viewArt(authorId);
            } else {
                console.log('浏览器环境中')
            }
        },
        openApp() {
            if(util.isIOS()) {
                this.toastMsg = 'iOS版本即将上线，敬请期待';
                return;
            }
            let url = {};
            let ua = navigator.userAgent.toLowerCase();
            if(ua.match(/android/i)){
                url = {
                    open: 'lishijie://splash',
                    down: 'https://www.lishijie.net/download/android/lishijie.apk'
                };
            }
            if(ua.match(/iphone|ipod|ipad/)){
                url = {
                    open: 'lishijie://splash',
                    down: 'https://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8&ign-mpt=uo%3D4'
                };
            }
            let winScreenWidth = window.screen.width;
            var iframe = document.createElement('iframe');
            var timer = null;
            var isInstalled = false;
            if(/MicroMessenger/gi.test(navigator.userAgent)) {
                // 引导用户在浏览器中打开
                this.toastMsg = '请使用浏览器打开';
                this.toastDuration = 2000;
            } else if(winScreenWidth < 800){
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
                        window.location.href = 'market://search?q=里世界';
                    }
                }, 200);
            } else {
                window.location.href = 'https://www.lishijie.net/download/android/lishijie.apk'
            }
        },
        goBack() {
            if(util.isAndroid()) {
                callNative.goBack();
            } else if (util.isIOS()) {
                // window.webkit.messageHandlers.goBack.postMessage(null)
                callNative.goBack();
            }
        },
        shareWeb() {
            let param = {
                'supTitle': '【里世界】年轻正当时',
                'subTitle': '打破次元壁的冰上阴阳师',
                // todo
                'url': this.shareDomain + '/acgn-young/html/index.html', 
                // 'url': 'http://172.16.185.182/acgn-young/index.html', 
                // 'url': 'http://172.18.4.30:8801/index.html', 
                'avatar': this.shareDomain + '/utils/image/share-avatar1.jpg'  
            };
            if(util.isAndroid()) {
                callNative.shareWeb(param.supTitle, param.subTitle, param.url, param.avatar);
            } else if (util.isIOS()) {
                // window.webkit.messageHandlers.shareWeb.postMessage(param)
                callNative.shareWeb(param.supTitle, param.subTitle, param.url, param.avatar);
            }
        },
    },
    components: {
        Toast
    },
    watch: {
        '$store.state.token': {
            handler:(val, oldVal)=>{
                if(val != oldVal) {
                }
            },
        },
    }
}
</script>
