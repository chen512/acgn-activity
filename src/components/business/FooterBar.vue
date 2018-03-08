<style lang="less">
    @media screen and (min-width: 800px) {
        .download {
            width: 40%!important;
            overflow: hidden;
            position: fixed;
            bottom: 0;
            left: 30%!important;
            border-top: 1px solid #e5e5e5;
            background-color: #fff;
            background-color: rgba(255, 255, 255, .9);
        }
    }
	.download {
		width: 100%;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1px solid #e5e5e5;
		background-color: #fff;
		background-color: rgba(255,255,255,.9);
		&__icon {
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 12px;
			margin: .361rem .333rem;
			float: left;
			background-color: #efefef;
		}
		&__about {
			width: 7.23rem;
		    float: left;
		    font-size: .32rem;
		    line-height: .54rem;
		    color: #999;
		    margin-top: .761rem;
		}
		&__name {
			display: inline-block;
			height: .444rem;
			line-height: .444rem;
			font-size: .444rem;
			color: #000;
		}
		&__link {
			display: inline-block;
			width: 2.4444rem;
			height: 1.1111rem;
			line-height: 1.1111rem;
			font-size: .444rem;
			float: right;
			border-radius: 5px;
			background-color: #5CCCCC;
			color: #FFF;
			text-align: center;
			margin-top: -.0835rem;
			margin-right: -12px;
			font-family: SourceHanSansCN-Medium;
		}
		&__desc {
			margin-top: .166rem;
			line-height: .42rem;
			font-size: .3rem;
		}
	}
</style>
<template>
	<div class="download">
		<img src="../../assets/icon.png" class="download__icon">
		<div class="download__about">
			<div>
				<strong class="download__name">里世界</strong>
				<p class="download__link" @click="openApp()">下载</p>
			</div>
			<p class="download__desc">好用又全面的二次元内容聚会APP！</p>
		</div>
		<Toast v-if="msg" :msg="toastMsg" :duration="toastDuration"></Toast>
	</div>
</template>
<script>
	import util from '../common/util';
	import Toast from './Toast.vue';
	export default {
	    name: 'app',
	    data() {
	        return {
	        	toastMsg: '',
	            toastDuration: 2000, 
	        }
	    },
	    computed: {
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
	    methods: {
	    	openApp() {
	            if(util.isIOS()) {
	                this.toastMsg = 'iOS版本即将上线，敬请期待';
	                return;
	            }
	            if(/MicroMessenger/gi.test(navigator.userAgent)) {
	                this.toastMsg = '你还未下载App，请点击下方下载后点击查看哦！';
	                return;
	            }
	            util.installApp();
	        },
	    },
		components: {
			Toast
		}   
	}
</script>