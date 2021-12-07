<template>
	<view>
	
		<!-- 文字滚动 -->
		<uni-notice-bar showIcon="true" scrollable="true" single="true" :text="notice.text"></uni-notice-bar>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice:{
					text:"[通知] 欢迎您使用打卡记账APP"
				}
			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
