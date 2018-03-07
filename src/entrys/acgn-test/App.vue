<style lang="less">
    .app {
        background: #041d41;
    }
    .banner {
        position: relative;
        width: 100%;
        height: 5.962963rem;
    }
    .banner-img {
        width: 100%;
        height: 100%;
    }
    .coupon {
        position: relative;
        top: -3%;
        width: 9.111111rem;
        height: 7.777778rem; 
        background: url('~assets/images/activity-coupon/coupon.png') no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
    }
    .get-btn {
        position: absolute;
        bottom: 30px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        width: 5.0rem;
        height: 1.055556rem;
        line-height: 1.2rem;
        background: transparent url('~assets/images/activity-coupon/get-btn.png') no-repeat;
        background-size: 100% 100%;
        color: #fff;
        font-size: 0.444444rem;
        font-weight: 500;
        text-align: center;
    }
    .got {
        background: transparent url('~assets/images/activity-coupon/get-btn-disable.png') no-repeat;
        background-size: 100% 100%;
    }
    .desc {
        position: relative;
        top: 2%;
        padding-top: 0.388889rem;
        padding-left: 0.444444rem;
    }
    .desc-line {
        width: 0.111111rem;
        height: 0.472222rem;
        background-color: #2f84e5;
        position: absolute;
        top: 50%;
        transform: translate(0,-50%);
    }
    .desc-tip {
        padding-left: 0.333333rem;
        position: absolute;
        top: 50%;
        transform: translate(0,-50%);
    }
    .desc-tip p{
        font-weight: 500;
        font-size: 0.444444rem;
        color: #2f84e5;
    }
    .desc-text {
        position: absolute;
    }
    .desc-text p {
        font-weight: normal;
        font-size: 0.333333rem;
        margin-top: 0.194444rem;
        padding-right: 0.444444rem;
        color: #2f84e5;
    }
    .second {
        top: 3.3rem;
    }
    .second .desc-text p:last-child {
        margin-bottom: .7rem;
    }
    .desc-text p:first-child {
        margin-top: 0.37037rem;
    }
    .dialog__confirm-btn {
        background-color: #2093d4 !important;
    }
</style>
<template>
<div id="app" class="app">
    <div class="banner">
        <img class="banner-img" src="~assets/images/activity-coupon/bg.jpg">
    </div>
    <div class="coupon">
        <div class="get-btn" 
            v-html="couponHtml" 
            @click="getCoupon"
            :class="{'got': couponStatus}"
        ></div>
    </div>
    <div class="desc">
        <div class="desc-line"></div>
        <div class="desc-tip"><p>领用说明</p></div>
        <div class="desc-text">
            <p>1. 领取：成功登录 Flyme账号，点击领取优惠券 1张；</p>
            <p>2. 查询：打开游戏中心 APP - 点击右上角头像查询；</p>
            <p>3. 使用：游戏中消费时勾选优惠券直接抵扣现金使用。</p>
        </div>
    </div>
    <div class="desc second">
        <div class="desc-line"></div>
        <div class="desc-tip"><p>常见问题</p></div>
        <div class="desc-text">
            <p>1. 每个账号只能领取一张优惠券；</p>
            <p>2. 无法领取优惠券，请退出账号并重新登录；</p>
            <p>3. 有时由于网络波动可能延迟到账；</p>
            <p>4. 退出/登录：进入游戏中心-右上角个人中心--点击头像-账号管理。</p>
        </div>
    </div>
</div>
</template>
<script>
    import Vue from 'vue';
    import 'style/common.less';
    //import Enum from 'common/enum';
    // import DialogBuilder from 'base/DialogBuilder';
    // import logger from 'common/logger';
//    import util from 'common/util';
//    import N from 'common/nativeinterface';
    import CouponResult from './CouponResult.vue';
    if(process.env.NODE_ENV != 'production') {
        window.__ACTIVITY_ID__ = 100;
        window.__ACTIVITY_CONFIG__ = {
            __AWARDS__: [],
            __TASKS__: [],
            __APPS__: [],
            __ZIPPOS__: []
        }
    }
    Vue.use({
        install(vue) {
            vue.__STORE__ = ({});
            vue.__META__ = ({});
            vue.__REQ_ENV__ = process.env.NODE_ENV != 'production' ? '/mock' : '';
        }
    });
    export default {
        name: 'App',
        $global: true,
        data: function() {
            return {
                hasGet: false,
                couponHtml: '领取',
                couponStatus: 0, //优惠券状态：0-领取 ； 1-已领取 
                couponZippo: util.isInBrowser() && window.__ACTIVITY_CONFIG__ ? window.__ACTIVITY_CONFIG__.__ZIPPOS__[0] : {},
            } 
        },
//        computed: {
//            freeTask() {
//                let _task = {};
//                if(util.isInBrowser && window.__ACTIVITY_CONFIG__) {
//                    window.__ACTIVITY_CONFIG__.__TASKS__.forEach((task) => {
//                        if(task.type == 'FREE') {
//                            _task = task;
//                        }
//                    });
//                }
//                return _task;
//            }
//        },
//        beforeMount() {
//            if(process.env.NODE_ENV == 'production' && !(parent && parent._is_preview)) {
//                logger.makeActivityLog('activity_page_skim');
//                N.on(Enum.INTERFACE_EVENT.LOGIN, ()=> {
//                    window.location.reload();
//                });
//                N.on(Enum.INTERFACE_EVENT.LOGOUT, ()=> {
//                    window.location.reload();
//                });
//            }
//        },
//        mounted() {
//            let hsaLogin = !!N.getUserId();
//            if(hsaLogin) {
//                if(!util.getStorage('task_' + this.freeTask.id)) {
//                    this.$store.dispatch('postTask', {context: this, params: {task_ids: this.freeTask.id, content: {status: 2}}}).then((val) => {
//                        logger.makeActivityLog('activity_qualified_num'); //领取优惠券机会成功人数埋点
//                        util.setStorage('task_' + this.freeTask.id, 2);
//                    }).catch((err) => {
//                        logger.makeActivityLog('activity_lotterytimesbad_times');//获取领取优惠券机会异常
//                        if(err.code == 401) {
//                            logger.makeActivityLog('activity_lotterysignbad_times');//登录账号异常
//                        } else {
//                            this.$handleReqErr(err);
//                        }
//                    });
//                }
//                /*if(util.getStorage('zippo_' + this.couponZippo.id)) {
//                    this.couponStatus = 1;
//                    this.couponHtml = '已领取';
//                }*/
//            }
//        },
//        methods: {
//            getCoupon() {
//                if(!this.$checkVersion()) {return;};
//                if(!N.getUserId()) {
//                    DialogBuilder.of(this).alert('登录后才可以领取哦', function() {
//                        this.dismiss();
//                        N.login();
//                    }, {confirmBtnTxt: '登录'});
//                } else {
//                    if(this.couponStatus == 1) {
//                        return;
//                    }
//                    logger.makeActivityLog('activity_coupon_get');//点击领取优惠券埋点
//                    this.$store.dispatch('doLottery', {context: this, params: {zippo_ids: this.couponZippo.id}}).then((value) => {
//                        this.showLotteryResult(value[0]);
//                        util.setStorage('zippo_' + this.couponZippo.id, 2);
//                        this.couponHtml = '已领取';
//                        this.couponStatus = 1;
//                    }).catch((err) => {
//                        if(err.code && err.code == 120040) {
//                            util.setStorage('zippo_' + this.couponZippo.id, 2);
//                            this.couponHtml = '已领取';
//                            this.couponStatus = 1;
//                            DialogBuilder.of(this).alert('请勿重复领取～');
//                        } else {
//                            return Vue.Promise.reject(err);
//                        }
//                    }).catch((err) => {
//                        logger.makeActivityLog('activity_lotterybad_times');//领取优惠券异常埋点
//                        this.$handleReqErr(err);
//                    })
//                }
//            },
//            showLotteryResult(award) {
//                if(award && award.award_type == Enum.AWARD_TYPE.COUPON) {
//                    logger.makeActivityLog('activity_coupon_get_success');//领取优惠券成功埋点
//                    let _CouponResult = Vue.extend(CouponResult);
//                    let self = this;
//
//                    DialogBuilder.of(this).alert('领取成功！', util.createComponentProxy(_CouponResult, {'award': {'icon': ''}}), function() {
//                        this.dismiss();
//                    }, {confirmBtnTxt: '确定'})
//                } else {
//                    logger.makeActivityLog('activity_coupon_get_intergration');//领取到的是积分的埋点
//                    DialogBuilder.of(this).alert('出错了！刷新看看～');
//                }
//            }
//        },
        components: {}
    }
</script>