<template>
	<view>
		<view v-if="!isLogin" style="display: flex;flex-direction: column;align-items: center;margin-top: 40vh;">
			<button size="mini">去登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin:false
			}
		},
		methods: {
			
		},
		onShow() {
			console.log("show...jizhang")
			const value = this.commonApi.getUserToken()
			if (value) {
				this.isLogin = true
			}else {
				this.isLogin = false
			}
		}
	}
</script>

<style>

</style>
