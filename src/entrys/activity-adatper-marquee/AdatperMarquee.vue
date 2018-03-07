<style lang="less">
    .marquee {
        position: relative;
        margin: 0 auto;
        background-color: #58a6f0;
        border-radius: 0.111111rem;
        width: 9.259259rem;
        &__light {

         }
        &__bgimg {
             width: 9.259259rem;
             height: 6.546296rem;
             margin: auto;
         }
        &__awardimg {
             position: absolute;
             top: 58.5%;
             left: 50%;
             width: 8.222222rem;
             height: 4.361111rem;
             transform: translate3d(-50%,-50%,0);
             -webkit-transform: translate3d(-50%,-50%,0);
         }
        &__gobg {
             position: absolute;
             top: 58.5%;
             left: 50%;
             transform: translate(-50%,-50%);
             width: 8.1rem;
             height: 4.361111rem;
         }
        &__btn {
             position: absolute;
             left: 50%;
             transform: translate(-50%,-50%);
             background: url('') no-repeat;
             background-size: contain;
             top: 58.5%;
             width: 4.861111rem;
             height: 1.416667rem;
         }

        &__certification{
            position: fixed;
            top: 50%;
            left: 50%;
            width: 8.055556rem;
            height: auto;
            background: #337ee1;
            padding: 0.333333rem;
            border-radius: 0.111111rem;
            -webkit-transform: translate3d(-50%, -50%, 0);
            transform: translate3d(-50%, -50%, 0);

        }
        &__titles{
            font-weight: 600;
            font-size: 0.444444rem;
            color: #FFFFFF;
        }
        &__headers{
            padding-top: 0.25rem;
            text-align: center;
            font-size: 0.444444rem;
            font-weight: 500;
            line-height: 0.592593rem;
        }
        &__bodys {
            padding: 0 0.277778rem;
            max-height: 5.777778rem;
            font-size: 0.388889rem;
            line-height: 0.6rem;
        }
        &__input {
            height: 2.1rem;
            border-bottom: 0.055556rem #74B0FF solid;
            input{
                width: 90%;
                border: 0;
                outline: 0;
                background: transparent;
                font-size: .444444rem;
                color: #FFFFFF;
                padding: 0.055556rem 0 0.12037rem 0.39rem;
            }
            p{
                font-size: 0.333333rem;
                color: #74B0FF;
                padding: 0.50rem 0 0 0.39rem;
            }
            &__cid {
                height: 2.1rem;
                border-bottom: 0.055556rem #74B0FF solid;
                input{
                    width: 90%;
                    border: 0;
                    outline: 0;
                    background: transparent;
                    font-size: .444444rem;
                    color: #FFFFFF;
                    padding: .7rem 0 0 0.39rem;
                }
            }
        }
        &__txt{
            color: #FAE320;
            padding-bottom: 0.1rem;
        }
        &__tips{
            color: #74B0FF;
            padding-right: 0.648148rem;
        }
        &__lf{
            padding-left: 0.648148rem;
            font-size: 0.333333rem
        }
        &__footer{
            padding: 0.5rem 0 0.3rem 0;
            text-align: center;
            button{
                border: 0;
                height: 0.944444rem;
                min-width: 2.777778rem;
                padding: 0 0.444444rem;
                background: #ef6935;
                font-size: .444444rem;
                border-radius: 9999px;
                width: 5.074074rem;
            }
        }
        &__overlay{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background-color: #000000;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 0.04;
        }
        &__displaynone{
            display: none;
        }

        img {
            display: block;
        }
        span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 9;
            color: #fff;
            font-size: 0.388889rem;
            line-height: 1.6;
            text-align: center;
            letter-spacing: 1px;
            em {
                padding: 0 0.111111rem;
                color: #fffb85;
            }
        }
    }
    .dialog{
        color: #fff!important;
        background-color: #2e7be5!important;
    }
    .dialog__body {
        background-color: #2e7be5!important;
    }
    .dialog__confirm-btn {
        color: #fff!important;
        background-color: #ffaa01!important;
    }
    .winning-name span {
        color: #ffaa01!important;
    }
    canvas{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    #selector {
        display: none;
    }
    input::-webkit-input-placeholder{
        color: #74B0FF;
    }

</style>
<template>
    <div>
        <div id="marquee" ref="marquee" class="marquee">

            <img  ref="marquee__bgimg" class="marquee__bgimg" src="~assets/images/mgcadatpermarquee/marquee_adatper_bg.png" />

            <img ref="marquee__gobg" class="marquee__gobg" src="~assets/images/mgcadatpermarquee/go_bg.png" />

            <img id="selector" class="" ref="selector" src="~assets/images/mgcadatpermarquee/go_select.png"/>

            <canvas ref="selector_canvas" id="selector-canvas" width="0" height="0"></canvas>

            <img class="marquee__awardimg" ref="marquee__awardimg" src="~assets/images/mgcadatpermarquee/marquee_adatper_award.png" />

            <img ref="one" :src="realSelectBtnImg" class="marquee__btn" @click.stop="startLottery(5,3)" />

            <div class="marquee__overlay" ref="marquee__overlay" style="z-index: 1235; opacity: 0.4; background-color: rgb(0, 0, 0); display: none"></div>
            <div class="marquee__certification" ref="marquee__certification" style="z-index: 1236; display: none">
                <div class="marquee__headers">
                    <div class="marquee__titles">实名认证</div>
                </div>
                <div class="marquee__bodys">
                    <div class="marquee__input"><p>姓名</p><input name="username" v-model="username" ref="username" maxlength="18"/></div>
                    <div class="marquee__input__cid"><input name="usercid" v-model="usercid" ref="usercid" maxlength="18" placeholder="身份证号码" /></div>
                </div>
                <p class="marquee__txt marquee__lf" v-html="certtips"></p>
                <p class="marquee__tips marquee__lf">注: 根据中华人民共和国《移动互联网应用程序信息服务管理规定》，需要用户进行身份信息认证，我们承诺将严格保护您的个人信息，不会对外泄露。</p>
                <div class="marquee__footer">
                    <button class="" style="background-color: #fba928; color: rgb(255, 255, 255);" @click="complite()">完成</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Enum from 'common/enum'
    import util from 'common/util'
    import util2 from 'common/util2'
    import NativeInterface from 'common/nativeinterface'
    import DialogBuilder from 'base/DialogBuilder'
    import LotteryResult from 'littles/LotteryResult.vue'
    import BigTitle from 'littles/BigTitle.vue'
    import LotteryTipsMixin from 'base/LotteryTipsMixin'
    import logger from 'common/logger'
    import Vue from 'vue'
    import MyAwards from 'littles/MyAwards.vue'
    import {oauthRequest, createSilentParams, request} from 'common/request';
    export default {
        name: 'rectAngle',
        mixins: [LotteryTipsMixin],
        data() {
            return {
                canvasInterval: 100,
                award: [],
                animation: 1,
                startTime: 1,
                playing: true,
                isAuth: false,//是否實名認證
                zippos: [],
                times: 0,
                deviationX: 0,
                deviationY: 0,
                username:'',
                usercid:'',
                certtips:'',
                uid: '',
                selectStatus: 0
            }
        },
        computed: {
            freeTasks() {
                let _task = [];
                if(util.isInBrowser && window.__ACTIVITY_CONFIG__) {
                    window.__ACTIVITY_CONFIG__.__TASKS__.forEach((task) => {
                        if(task.type == 'FREE') {
                            _task.push(task);
                        }
                    })
                }
                return _task;
            },
            realSelectBtnImg() {
                let img = [
                {'url': require('../../assets/images/mgcadatpermarquee/select_btn.png')},
                {'url': require('../../assets/images/mgcadatpermarquee/select_btn_disable.png')}];
                return img[this.selectStatus].url
            }
        },
        mounted() {
            var self = this;
            this.zippos = util.getZippos();
            this.uid = NativeInterface.getUserId();
            this.init();
            NativeInterface.on(Enum.INTERFACE_EVENT.UPDATE_TIMES, ()=> {
                let zippoIds = this.zippos.map((item)=> item.id);
                this.$store.dispatch('fetchLotteryTimes', {context: this, params: {zippo_ids: zippoIds.join(',')}}).then((response) => {
                    this.times = response.zippoTimes[0].times
                    if(this.times > 0) {
                        util.setStorage('times_' + this.uid, 1);
                    } 
                }).catch(()=> {
                     DialogBuilder.of(this).alert('获取抽奖次数异常～请退出重进！')
                })
            })

            if(util.getStorage('lottery_' + window.__ACTIVITY_ID__) && this.times == 0) {
                this.selectStatus = 1;
            }
            if(this.uid) {
                oauthRequest.call(this, `${Vue.__REQ_ENV__}/oauth/check/user/cert`).then((response) => {
                    if(response.result == '1') {
                        logger.makeActivityLog('activity_page_auth_times'); //进入该页面的实名认证用户人数
                        self.isAuth = true;
                        self.postTask();
                    } else if(response.result == '-1') {
                        logger.makeActivityLog('activity_page_unauth_times'); //进入该页面的非实名认证用户人数
                    }
                }).catch(()=> {
                    logger.makeActivityLog('activity_getauth_bad_times'); //获取实名认证接口失败人数
                    DialogBuilder.of(this).alert('获取实名认证接口失败');
                });
            }
            if(!util.getStorage('lottery_' + window.__ACTIVITY_ID__)) {
                NativeInterface.emit(Enum.INTERFACE_EVENT.UPDATE_TIMES);
            }
        },
        methods: {
            init() {
                this.$nextTick(() => {
                    var self = this,
                        marqueeBgimgClientWidth = self.$refs.marquee__bgimg.clientWidth,
                        marqueeBgimgClientHeight = self.$refs.marquee__bgimg.clientHeight,
                        marqueeClientWidth = self.$refs.marquee.clientWidth,
                        marqueeClientHeight = self.$refs.marquee.clientHeight,
                        awardimgWidth = self.$refs.marquee__awardimg.width,
                        awardimgHeight = self.$refs.marquee__awardimg.height
                    //初始化偏移x、y
                    this.deviationX=(marqueeBgimgClientWidth-awardimgWidth)/2;
                    this.deviationY=(marqueeBgimgClientHeight-awardimgHeight)/2;
                    var t = new Image
                        , a = this.$refs.selector_canvas 
                        , i = a.width = marqueeClientWidth  
                        , e = a.height = marqueeClientHeight 
                        , n = a.getContext("2d")
                        , o = this.deviationX/awardimgWidth * i 
                        , s = this.deviationY/awardimgHeight * e  
                        , l = 0.1670 * i  
                        , c =  0.2107 * e; 

                    n.fillStyle = 'rgba(255, 255, 255, 0)';
                    t.onload = function() {
                        n.clearRect(0, 0, i, e);
                        n.drawImage(t, o, s, l, c)
                        // alert(o+','+s+','+l+','+c)
                    },
                    t.src = this.$refs.selector.src;
                });
            },
            complite() {
                this.$nextTick(() => {
                    var username = this.username.replace(/\s/g,'');
                    var usercid = this.usercid.replace(/\s/g,'');
                    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    var regContent = new RegExp(reg);
                    if((username&&usercid) == ''){
                        this.certtips= '用户名或身份证号不能为空！';
                        return;
                    } else if(!regContent.test(this.usercid)) {
                        this.certtips = '身份证号有误！'
                        return;
                    }
                    this.$refs.marquee__overlay.style.display = 'none'
                    this.$refs.marquee__certification.style.display = 'none';

                    //{"code":200,"message":"","redirect":"","value":{"errorMsg":"CERTNO_Mismatch","result":1}}
                    oauthRequest.call(this, `${Vue.__REQ_ENV__}/oauth/submit/user/cert`, {uid: this.uid, name: username, number: usercid}).then((response) => {
                        if(response.result == 1) {
                            this.isAuth = true;
                            this.postTask();
                        } else {
                            DialogBuilder.of(this).alert('实名认证不成功')
                        }
                    }).catch((e)=> {
                        DialogBuilder.of(this).alert('实名认证提交失败');
                    });
                });
            },
            startLottery(x, y) {
                var self = this,
                    marqueeClientWidth = self.$refs.marquee.clientWidth,
                    marqueeClientHeight = self.$refs.marquee.clientHeight,
                    awardimgWidth = self.$refs.marquee__awardimg.width,
                    awardimgHeight = self.$refs.marquee__awardimg.height,
                    selectorWidth = self.$refs.selector.width,
                    selectorHeight = self.$refs.selector.height;

                logger.makeActivityLog('activity_lottery_times');//新增的“点击抽奖按钮的次数”埋点
                if(!self.playing) {
                    return;
                }
                this.playing = false;

                if(!this.$checkVersion()) {return;};
                
                if(!NativeInterface.getUserId()) {
                    DialogBuilder.of(this).alert('登录后才可以抽奖哦~', function() {
                        this.dismiss();
                        NativeInterface.login();
                    }, {confirmBtnTxt: '登录'});
                    return;
                }
                //当没有实现实名制时，引导实名制
                // this.times = 1;
                if(!self.isAuth) {
                    logger.makeActivityLog('activity_lottery_unauth_times'); //点击抽奖按钮的非实名认证用户人数
                    DialogBuilder.of(this).confirm('提示', '根据中华人民共和国《移动互联网应用程序信息服务管理规定》，需要用户进行身份信息认证，我们承诺严格保护个人信息，不对外泄露。', function() {
                        this.dismiss();
                        self.reset();
                        self.$refs.marquee__overlay.style.display = 'block'
                        self.$refs.marquee__certification.style.display = 'block';
                    }, function() {
                        this.dismiss();
                        self.reset();
                    }, {confirmBtnTxt: '去认证', cancelBtnTxt: '取消', bgColor: '#337ee1', fontColor: '#FFFFFF', confirmBtnBgColor: '#fba928', textAlign: 'left'});
                    return;
                }

                logger.makeActivityLog('activity_lottery_auth_times'); //点击抽奖按钮的实名认证用户人数
                if(this.times > 0) {
                    util.setStorage('lottery_' + window.__ACTIVITY_ID__, 1);
                    this.startTime = Date.now();
                    let zippoIds = this.zippos.map((zippo) => zippo.id).join(',');
                    logger.makeActivityLog('activity_real_lottery_times'); //活动参与人数：实际使用参与机会的人数
                    this.$store.dispatch('doLottery', {context: this, params:{zippo_ids: zippoIds}}).then((value) => {
                        //开始跑马
                        var t = new Image
                                , a = this.$refs.selector_canvas
                                , i = a.width = marqueeClientWidth
                                , e = a.height = marqueeClientHeight
                                , n = a.getContext("2d")
                                , o = this.deviationX/awardimgWidth * i
                                , s = this.deviationY/awardimgHeight * e
                                , l = 0.1670 * i
                                , c =  0.2107 * e;
                        t.src = this.$refs.selector.src;
                        var r, d, u = 0.177 * i, v =0.227 * e, p = {}, f = 0, h = 0, g;
                            for (var j = 0; j < (2*x + 2*y -4); j++) {
                                if (0 <= j && j < x) {
                                    p[j] = {x: j * u + o, y: 0 * v + s}
                                }
                                if (x <= j && j < (1.5 * x + 0.5 * y - 1)) {
                                    p[j] = {x: (x - 1) * u + o, y: (j + 1 - x) * v + s}
                                }
                                if ((x + y - 2) <= j && j < (2 * x + y - 2)) {
                                    p[j] = {x: (2 * x + y - j - 3) * u + o, y: (y - 1) * v + s}
                                }
                                if ((2 * x + y - 2) <= j && j< (2 * x + 2 * y - 4)) {
                                    p[j] = {x: 0 * u + o, y: (2 * x + 2 * y - j - 4) * v + s}
                                }
                            }
                         g = function(a) {
                            return self.award.length!==0 && r == self.award.idx ? void setTimeout(function() {
                                window.cancelAnimationFrame(self.animation)
                                        ,self.showLotteryResult(self.award)
                            }, 500) : (self.animation = window.requestAnimationFrame(g),
                                    void (a - h < self.canvasInterval || (h = a,
                                            r = f++ % 12,
                                            d = 0 == r ? 11 : r - 1,
                                            n.clearRect(0, 0, i, e),
                                            n.drawImage(t, p[r].x, p[r].y, l, c)
                                            // alert(p[r].x+','+p[r].y+','+l+','+c)
                                            )))
                        };
                        self.animation = window.requestAnimationFrame(g);

                        let diff = Date.now()-self.startTime;
                        let waitTime = diff > 2000 ? 600 - diff % 600 : 1800 - diff;
                        self.$delay(waitTime).then(() => {
                            self.canvasInterval=300;
                            self.award = self.findAwardById(value[0].award_id);
                            
                        })
                    }).catch(()=>{
                        DialogBuilder.of(this).alert('抽奖失败！请重试～');
                        self.reset();
                    })
                } else {
                    this.playing = true;
                    DialogBuilder.of(this).alert('暂无抽奖机会');
                }
            },
            showLotteryResult(result) {
                let self=this;
                if(result.award_id == 0 || result.type == Enum.AWARD_TYPE.INTEGRATION) {
                    DialogBuilder.of(this).confirm('很遗憾没有获奖', '祝你下次好运，请再接再厉！', function() {
                        this.dismiss();
                        self.reset();
                    }, function() {
                        this.dismiss();
                        self.reset();
                    }, {confirmBtnTxt: '确定'});
                } else if(result.award_type == Enum.AWARD_TYPE.COUPON) {
                    let _LotteryResult = Vue.extend(LotteryResult);
                    let _BigTitle = Vue.extend(BigTitle);
                    DialogBuilder.of(this).alert(util.createComponentProxy(_BigTitle, {title: this.$lang.$$winTitle}), util.createComponentProxy(_LotteryResult, {'award': result}), function() {
                        this.dismiss();
                        self.reset();
                    })
                }  else {
                    let _LotteryResult = Vue.extend(LotteryResult);
                    let _BigTitle = Vue.extend(BigTitle);
                    DialogBuilder.of(this).confirm(util.createComponentProxy(_BigTitle, {title: this.$lang.$$winTitle}), util.createComponentProxy(_LotteryResult, {'award': result}), function() {
                        this.dismiss();
                        self.$doMotion({type: Enum.MOTION.ADDRESS, params: []});
                        self.reset();
                    }, function() {
                        this.dismiss();
                        self.reset();
                    }, {confirmBtnTxt: '填写地址', cancelBtnTxt: '稍后填写'});
                }
                this.selectStatus = 1;
            },
            reset() {
                this.init();
                this.playing = true;
                this.canvasInterval = 100;
                this.award = [];
                window.cancelAnimationFrame(this.animation);
            },
            findAwardById(awardId) {
                let awards = window.__ACTIVITY_CONFIG__.__AWARDS__.slice(0, 12);
                let len = awards.length;
                let intergrations = [0,2,4,6,8,10];
                let num = parseInt(6*Math.random());
                let index = null;
                let award = null;
                index = intergrations[num];
                if(awardId == 0) {
                    award = awards[index];
                    award.idx = index;
                    return award;
                }
                while(len--) {
                    if(awards[len].id == awardId) {
                        if(awards[len].type == Enum.AWARD_TYPE.INTEGRATION) {
                            award = awards[index];
                            award.idx = index;
                            break;
                        } else {
                            award = awards[len];
                            award.idx = len;
                            break;
                        }
                        
                    }
                }
                return award
            },
            postTask() {
                let taskIds = this.freeTasks.map((item) => item.id);
                if(!util.getStorage('task_' + this.freeTasks[0].id) && !util.getStorage('times_' + this.uid)) {
                    this.$store.dispatch('postTask', {context: this, params: {task_ids: taskIds.join(','), content: {status: 2}}}).then((val) => {
                        logger.makeActivityLog('activity_qualified_num'); // 活动达标人数:获得抽奖、领取等参与机会的人数
                        util.setStorage('task_' + this.freeTasks[0].id, 2);
                    }).catch((err) => {
                        logger.makeActivityLog('activity_qualifiedbad_num');// 领取抽奖机会异常
                        if(err.code == 401) {
                            logger.makeActivityLog('activity_lotterysignbad_times');//登录账号异常
                        }
                        this.$handleReqErr(err)
                    })
                    NativeInterface.emit(Enum.INTERFACE_EVENT.UPDATE_TIMES); 
                }
            }
        }

    }
</script>