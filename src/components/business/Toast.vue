<style lang="less">
	.toast {
		position: fixed;
		width: 79%;
		left: 10.5%;
		bottom: 3.333333rem;
		z-index: 9999;
		background-color: rgba(51, 51, 51, .85);
		// transform: translate3d(-50%, 0, 0);
		border-radius: 2px;
		color: #fff;
		font-size: 0.388889rem;
		font-weight: 500;
		padding: 0.25rem 0.8rem;
		max-width: 80%;
		text-align: center;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: all 0.5s ease     
	}
	.fade-enter, .fade-leave-active{
	  opacity: 0
	}
</style>
<template>
	<transition name="fade" @after-leave="afterLeave">
    	<div class="toast" v-show="open" v-html="msg"></div>
	</transition>
</template>
<script>
	import Vue from 'vue';
	export default {
		name: 'Toast',
		props: {
			msg: {
				type: String,
				default: 'msg'
			},
			duration: {
				type: Number,
				default: 800
			}
		},
		data: function() {
			return {
				open: true
			}
		},
		watch: {
			msg(old, cur) {
				if(old != cur) {
					this.msg = old;
					this.open = true
					let context = this;
					setTimeout(() => {
						context.open = false;
					}, this.duration);
				}
			},
		},
		mounted: function() {
			let context = this;
			setTimeout(function() {
				context.open = false;
			}, this.duration);
		},
		destroyed: function() {
			this.$el.remove();
		},
		methods: {
			afterLeave: function() {
				// this.$destroy();
			}
		}
	}
</script>