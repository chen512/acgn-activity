<style lang="less">
    .mgcmarquee {
        background-color: #5aa8f0;
        &__banner {
            background: url('~assets/images/mgcadatpermarquee/mgc_adatper_bg.jpg') no-repeat;
            background-size: 100% 100%;
            height: 10.092593rem;
            width: 100%;
        }
        &__common {
            position: relative;
            background-color: #5aa8f0;
            border-bottom-right-radius: 0.111111rem;
            border-bottom-left-radius: 0.111111rem;
        }
        &__erweima {
            padding-top: .648148rem;
            img{
              display: block;
              margin: 0 auto;
              width: 92.5925%;
            }
        }
    }
</style>
<template>
    <div id="app" class="app mgcmarquee" @click="goToLogin">
        <div class="mgcmarquee__banner"></div>
        <div class="mgcmarquee__lottery mgcmarquee__common">
            <div class="lottey">
                <AdatperMarquee></AdatperMarquee>
            </div>
        </div>
        <qr-code :$bgColor="'transparent'"></qr-code>
        <RuleText
            :ruleTextMotion = "{type: ruleTextType, 'params': ['活动说明', ruleText]}"
            :fontColor="'#a2cbff'" 
            :$bgColor="'transparent'" 
            :fontSize="'0.35rem'">
        </RuleText>
    </div>
</template>
<script>
    import Vue from 'vue'
    import 'style/common.less'
    import logger from 'common/logger'
    import AdatperMarquee  from './AdatperMarquee.vue'
    import Enum from 'common/enum'
    import util2 from 'common/util2'
    import util from 'common/util'
    import Interface from 'common/nativeinterface'
    import DialogBuilder from 'base/DialogBuilder'
    import toast from 'base/TotastBuilder'
    import QrCode from 'business/QrCode/index.vue';
    import RuleText from 'business/RuleText/index.vue';
    if(process.env.NODE_ENV != 'production') {
        window.__ACTIVITY_ID__ = 304;
        window.__ACTIVITY_CONFIG__ = {
            __AWARDS__: [{"id":9243,"icon":"http://img10.360buyimg.com/n4/s260x260_jfs/t3109/247/1406272759/162435/43b8eff2/57cd2403N572e7750.jpg","name":"谢谢参与","type":"INTEGRATION"},{"id":202,"icon":"http://img10.360buyimg.com/n4/s260x260_jfs/t3109/247/1406272759/162435/43b8eff2/57cd2403N572e7750.jpg","name":"50元京东卡","type":"COUPON"},{"id":203,"icon":"http://img10.360buyimg.com/n4/s260x260_jfs/t3109/247/1406272759/162435/43b8eff2/57cd2403N572e7750.jpg","name":"100元话费卡","type":"MATERIAL"}],
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
                ruleText: '1. 已完成实名认证的Flyme用户可抽奖一次<br>2. 未实名认证用户点击抽奖或下载游戏，按照提示填写信息<br>3. 实物奖励将在每月中旬和下旬统一发放<br>4. 如有疑问可联系魅族游戏中心客服QQ:3001420726，客服热线:4007883332，官方游戏中心Q群:493272311<br>优惠券说明：<br>查询-打开游戏中心，点击右上角进入个人中心查询优惠券<br>使用-登录Flyme账号进入游戏消费时勾选直接抵扣现金，自发放日起5日内有效',
                ruleTextType: Enum.MOTION.RULE_TXT
            }
        },
        beforeMount() {
            if(process.env.NODE_ENV == 'production' && !(parent && parent._is_preview)) {
                logger.makeActivityLog('activity_page_skim');
            }
        },
        mounted() {
        },
        methods: {
            goToLogin() {
                if(!Interface.getUserId()) {
                    DialogBuilder.of(this).alert('登录后才可以抽奖哦~', function() {
                        this.dismiss();
                        Interface.login();
                    }, {confirmBtnTxt: '登录'});
                    return;
                }
            }
        },
        components: { 
            AdatperMarquee,
            QrCode,
            RuleText
        }
    }
</script>