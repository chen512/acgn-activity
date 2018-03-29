<style lang="less">
    .back-icon {
        position: fixed;
        top: 0.185185rem;
        left: 0.37037rem;
        width: 0.925926rem;
        height: 0.925926rem;
        background: url('../../assets/images/acgn-coser/back-icon.png');
        background-size: 100% 100%;
        z-index: 999;
    }
    .share-icon {
        position: fixed;
        top: 0.185185rem;
        right: 0.37037rem;
        width: 0.925926rem;
        height: 0.925926rem;
        background: url('../../assets/images/acgn-coser/share-icon.png');
        background-size: 100% 100%;
        z-index: 999;
    }
    .banner {
        width: 100%;
        height: 8.324074rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .author1 {
        position: relative;
        width: 100%;
        height: 5.768519rem;
        background: url('../../assets/images/acgn-coser/author1.jpg');
        background-size: 100% 100%;
        i {
            right: 3.2rem;
            bottom: .8rem;
        }
        i:last-child {
            right: .8rem;
        }
    }
    .author2 {
        position: relative;
        width: 100%;
        height: 6.018519rem;
        background: url('../../assets/images/acgn-coser/author2.jpg');
        background-size: 100% 100%;
        i {
            left: 1.15rem;
            bottom: .8rem;
        }
        i:last-child {
            left: 3.55rem;
        }
    }
    .author3 {
        position: relative;
        width: 100%;
        height: 5.842593rem;
        background: url('../../assets/images/acgn-coser/author3.jpg');
        background-size: 100% 100%;
        i {
            right: 3.2rem;
            bottom: .8rem;
        }
        i:last-child {
            right: .8rem;
        }
    }
    .author1-detail {
        display: block;
        width: 100%;
        height: 9.592593rem;
    }
    .author2-detail {
        display: block;
        width: 100%;
        height: 9.592593rem;
    }
    .author3-detail {
        display: block;
        width: 100%;
        height: 12.074074rem;
    }
    .focus {
        position: absolute;
        display: block;
        width: 1.962963rem;
        height: 0.898148rem;
        background: url('../../assets/images/acgn-coser/focus.png');
        background-size: 100% 100%;
    }
    .focused {
        background: url('../../assets/images/acgn-coser/focused.png');
        background-size: 100% 100%;
    }
    .enter {
        position: absolute;
        display: block;
        width: 1.962963rem;
        height: 0.907407rem;
        background: url('../../assets/images/acgn-coser/enter.png');
        background-size: 100% 100%;
    }
</style>
<template>
    <div class="young">
        <!-- 分享出去的页面，不显示token，去掉图标 -->
        <i class="back-icon" @click="goBack" v-if="sharePage"></i>
        <i class="share-icon" @click="shareWeb" v-if="sharePage"></i>
        <div class="banner">
            <img src="../../assets/images/acgn-coser/banner.jpg">
        </div>
        <div class="author1">
            <i class="focus" @click="markAuthor('18150')"></i>
            <i class="enter" @click="viewArt('18150')"></i>
        </div>
        <img class="author1-detail" src="../../assets/images/acgn-coser/author1-detail.jpg">
        <div class="author2">
            <i class="focus" @click="markAuthor('15420')"></i>
            <i class="enter" @click="viewArt('15420')"></i>
        </div>
        <img class="author2-detail" src="../../assets/images/acgn-coser/author2-detail.jpg">
        <div class="author3">
            <i class="focus" @click="markAuthor('15198')"></i>
            <i class="enter" @click="viewArt('15198')"></i>
        </div>
        <img class="author3-detail" src="../../assets/images/acgn-coser/author3-detail.jpg">
        <FooterBar v-if="!sharePage"></FooterBar>
        <Toast v-if="msg" :msg="toastMsg" :duration="toastDuration"></Toast>
    </div>
</template>
<script>
    import {pageTracking, enterAuthorPageTracking, userFocusList, viewAuthorTracking} from 'common/api';
    import util from 'common/util';
    import Toast from 'business/Toast.vue';
    import FooterBar from 'business/FooterBar.vue';
    export default {
        name: 'app',
        data() {
            return {
                shareDomain: 'https://www.lishijie.net',
                toastMsg: '',
                toastDuration: 2000,
                authorList: [],
            }
        },
        computed: {
            sharePage() {  //true为在app内， false为分享出去的
                let isShare = true;
                if(this.$store.state.token == null || this.$store.state.token == undefined) {
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
                    }, this.toastDuration)
                } else {
                    show = false
                }
                return show;
            },
        },
        mounted() {
            let self = this;
            pageTracking({token: this.$store.state.token, contentId: 4}).then((res) => {
                console.log(res + '页面PV UV');
            });

            // 获取关注作者列表
            this.getUserFocusList();

            // 登录的回调接口
            window.userInfo = function(token, avatar, name) {

                self.$store.commit('setToken', token);
                self.getUserFocusList();
            }

            // 关注操作的回调函数
            window.focus = function(focus, authorId, authorList) {
                if(authorList) {
                    self.updateFocusBtn(JSON.parse(authorList),authorId);
                    self.toastMsg = '你已关注此作者，快去他/她的主页看看吧！';
                }
            }
        },
        methods: {
            getUserFocusList() {
                if(this.sharePage) { //在活动里面
                    if(this.$store.state.token) {  //且登录了
                        userFocusList({token: this.$store.state.token}).then((res) => {
                            let data = res.data.data;
                            if(data) {
                                this.authorList = data;
                                let list = document.querySelectorAll('.focus');
                                for(let i = 0; i < this.authorList.length; i++) {
                                    if(this.authorList[i].isFocus) {
                                        list[i].classList.add('focused');
                                    }
                                }
                            } else {
                                this.authorList = [{"authorId": 18150,"isFocus": 0}, {"authorId": 15420,"isFocus": 0}, {"authorId": 15198,"isFocus": 0}]
                            }
                        })
                    } else {
                        util.login();
                    }
                }
            },
            markAuthor(authorId) {
                if(this.sharePage) {  //在活动里面
                    if(this.$store.state.token) {
                        let param = {authorId}
                        if (util.isAndroid()) {
                            callNative.markAuthor(authorId, 1, JSON.stringify(this.authorList));
                        } else if (util.isIOS()) {
                            callNative.markAuthor(authorId, 1, JSON.stringify(this.authorList));
                        }
                        // 当已经关注过了，再次点击的时候就不埋点.
                        for(let i = 0; i < this.authorList.length; i++) {
                            if(this.authorList[i].authorId = authorId && !this.authorList[i].isFocus) {
                                viewAuthorTracking({token: this.$store.state.token, authorId: authorId}).then((res) => {
                                    console.log(res+'点击关注作者的埋点')
                                })
                            }
                        }
                    } else {
                        util.login();
                    }
                } else { //分享出去的页面
                    this.toastMsg = '如果你已下载App请在应用内打开，如未下载请点击下方下载按钮下载';
                }
            },
            updateFocusBtn(data,authorId) {
                this.authorList = data;
                let list = document.querySelectorAll('.focus');
                for(let i = 0; i < this.authorList.length; i++) {
                    if(this.authorList[i].authorId == authorId) {
                        list[i].classList.add('focused');
                    }
                }
            },
            viewArt(authorId) {
                let param = {token: this.$store.state.token, 'authorId': authorId};
                enterAuthorPageTracking(param).then((res) => {
                    console.log(res + '点击进入作者主页埋点');
                })
                if(this.sharePage) { //在活动页面，则正常进入作者主页
                    this.enterAuthorPage(authorId);
                } else {    //分享出去的页面，则进行下载/打开
                    this.openApp();
                }
            },
            enterAuthorPage(authorId) {
                if (util.isAndroid()) {
                    callNative.viewArt(authorId);
                } else if (util.isIOS()) {
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
                if(/MicroMessenger/gi.test(navigator.userAgent)) {
                    this.toastMsg = '请到应用宝、小米、oppo等应用商店下载App';
                    return;
                }
                util.installApp();
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
                    'supTitle': '呀！这是谁家的coser？捕捉最美小姐姐',
                    'subTitle': 'coser出没，请注意！',
                    'url': this.shareDomain + '/acgn-coser/html/index.html',
                    // 'url': 'http://172.16.185.182/acgn-coser/html/index.html',
                    'avatar': 'https://www.lishijie.net/utils/image/acgn-coser.jpg'
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
            Toast,
            FooterBar
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
