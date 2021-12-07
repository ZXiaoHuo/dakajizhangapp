<template>
	<view style="background-color: #f8f8f8;">
		<uni-row >
			<uni-col>
				<uni-list >
					<uni-list-item clickable showArrow title="账号与安全" @click=""/>
				</uni-list>
			</uni-col>
		</uni-row>
		<uni-row style="margin-top: 10px;height: 73vh;">
			<uni-col>
				<uni-list >
					<uni-list-item clickable showArrow title="隐私" @click=""/>
					<uni-list-item clickable showArrow title="通用" @click=""/>
				</uni-list>
			</uni-col>
		</uni-row>
		<uni-row >
			<uni-col :span="22" :offset="1">
				<view style="margin-bottom: 30px;">
					<button :plain="true" type="primary" @click="changeAccount()" style="margin-bottom: 10px;font-size: 16px;">切换账号</button>
					<button :plain="true" type="warn" @click="confirmDialog()" style="font-size: 16px;">退出登录</button>
				</view>
			</uni-col>
		</uni-row>
		<uni-popup ref="messageDialog" type="dialog">
			<uni-popup-dialog mode="base" title="通知" content="确定退出当前账号" @confirm="dialogConfirm" @close="dialogClose" />
		</uni-popup>
		
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0,
				items:["基本设置","安全设置"]
			}
		},
		methods: {
			confirmDialog() {
				this.$refs['messageDialog'].open()
			},
			dialogConfirm(done) {
				const username = this.commonApi.getUsername("username")
				this.commonApi.removeUserToken(username)
				this.commonApi.setUserInfo("user",null)
				this.commonApi.setUsername("username",null)
				uni.switchTab({
					url:'../user'
				})
			},
			dialogClose(done) {
				done
			},
			onClickItem() {
				
			}

		}
	}
</script>

<style>

</style>
