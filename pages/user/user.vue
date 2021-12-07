<template>
	<view style="background-color: #f8f8f8;">
		<!-- 未登录头部信息 -->
		<uni-row v-if="!isLogin">
			<uni-col>
				<uni-list>
					<uni-list-item :show-extra-icon="true" showArrow :extra-icon="extraIcon" title="您还未登录,请登录" link="navigateTo" to="/pages/login/login"/>
				</uni-list>
			</uni-col>
		</uni-row>
		<!-- 登录后头部信息 -->
		<uni-row v-else>
			<uni-col>
				<uni-card :isShadow="true" style="background-image: url('/static/img/bg1.jpg');">
					<uni-row>
						<uni-col :span="4">
							<view>
								<image class="circleImg" :src="user.avatar"></image>
							</view>
						</uni-col>
						<uni-col :span="17" :offset="1">
							<uni-row style="margin-top: 5px;">
								<uni-col>
									<text style="font-weight: 700;">{{user.nickname}}</text>
								</uni-col>
							</uni-row>
							<uni-row style="margin-bottom: 5px;">
								<uni-col :span="12">
									<text style="font-size: 12px;">{{user.uuid}}</text>
								</uni-col>
								<uni-col :span="10">
									<uni-tag style="font-size: 12px;" text="未认证" type="error" :circle="true" size="small"></uni-tag>
									<!-- <uni-tag text="已认证" type="success" :circle="true" size="small"></uni-tag> -->
								</uni-col>
							</uni-row>
						</uni-col>
						<uni-col :span="1" :offset="1">
							<view style="margin-top: 15px;" @click="toUserInfoPage()">
								<uni-icons type="arrowright" size="20" color="gray"></uni-icons>
							</view>
						</uni-col>
					</uni-row>
					<uni-row style="margin-top: 40px;">
						<!-- <uni-col :span="6">
							<view style="text-align: center;">123</view>
						</uni-col>
						<uni-col :span="6">
							<view style="text-align: center;">123</view>
						</uni-col>
						<uni-col :span="6">
							<view style="text-align: center;">123</view>
						</uni-col>
						<uni-col :span="6">
							<view style="text-align: center;">123</view>
						</uni-col> -->
					</uni-row>
				</uni-card>
			</uni-col>
		</uni-row>
		<!-- 登录后设置 -->
		<uni-row style="margin-top: 5%;" v-if="isLogin">
			<uni-col>
				<uni-list :border="false">
					<uni-list-item link="navigateTo" to="dkgzpz/dkgzpz" :show-extra-icon="true" clickable showArrow :extra-icon="{type:'settings'}" title="规则配置"/>
					<uni-list-item link="navigateTo" to="/pages/user/xtsz/xtsz" :show-extra-icon="true" clickable showArrow :extra-icon="{type:'gear'}" title="设置"/>
				</uni-list>
			</uni-col>
		</uni-row>
		<!-- 无需登录展示 -->
		<uni-row style="margin-top: 5%;">
			<uni-col>
				<uni-list>
					<uni-list-item :show-extra-icon="true" clickable showArrow :extra-icon="{type:'loop'}" title="检查更新" @click="clickItem('jcgx')"/>
					<uni-list-item :show-extra-icon="true" clickable showArrow :extra-icon="{type:'info'}" title="关于" @click="clickItem('gy')"/>
				</uni-list>
			</uni-col>
		</uni-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				extraIcon: {
					color: '#7fd9d3',
					size: '60',
					type:'contact' //icon名称
				},
				user:{
					/* nickname:"",
					avatar:"",
					uuid:"" */
				},
				isLogin:false
			}
		},
		methods: {
			clickItem(title) {
				switch(title) {
					case 'jcgx':
						uni.showLoading({
							title:"检查中...",
							mask: true
						})
						setTimeout(function () {
							uni.hideLoading();
							uni.showToast({
								title: "暂无更新",
								icon: "none",
								duration: 2000
							});
						}, 2000);
						return
					case 'gy':
						
						return
				}
				console.log(title)
			},
			toUserInfoPage() {
				uni.navigateTo({
					url:"info/info"
				})
			}
		
		},
		onLoad() {
			console.log("load...user")
		},
		onHide() {
			console.log("hide...user")
		},
		onInit() {
			console.log("init...user")
		},
		onShow() {
			console.log("show...user")
			const value = this.commonApi.getUserToken()
			if (value) {
				this.isLogin = true
				const user = this.commonApi.getUserInfo("user")
				/* this.user.nickname = user.nickName
				this.user.avatar = user.avatar
				this.user.uuid = user.uuid */
				this.user = user
			}else {
				this.isLogin = false
			}
		},
		onReady() {
			console.log("ready...user")
		},
		onUnload() {
			console.log("unload...user")
		}
	}
</script>

<style>
	.demo-uni-row {
		margin-bottom: 10px;
	}
	.demo-uni-col {
		height: 36px;
		border-radius: 5px;
	}
	.dark {
		background-color: #d3dce6;
	}
	.light {
		background-color: #e5e9f2;
	}

	.circleImg{
		border-radius: 100rpx;
		width:110rpx;
		height:110rpx;
		
	}
	.row_header{
		background-color:#0bb1f7;
	}
	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
	.user_card_name{
		/* display: flex;
		flex-direction: column;
		align-items: center; */
		margin-left: 10px;
		font-size: 20px;
		font-weight: 600;
	}
	.user_card_desc{
		/* display: flex;
		flex-direction: column;
		align-items: center; */
		margin-left: 10px;
		font-size: 12px;
		font-weight: 600;
	}
	
</style>
