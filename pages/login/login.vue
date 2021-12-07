<template>
	<view>
		<uni-row v-if="isLogin">
			<uni-col :span="20" :offset="2">
				<uni-row style="margin-top: 15vh;">
					<view style="font-size: 28px;">登录</view>
				</uni-row>
				<uni-row style="margin-top: 3vh;">
					<view style="font-size: 18px;color: #3F536E;">欢迎使用DKJZ!</view>
				</uni-row>
				<uni-row style="margin-top: 5vh;">
					<input v-model="user.username" type="number" class="input" placeholder="请输入用户名" maxlength="11"/>
				</uni-row>
				<uni-row style="margin-top: 3vh;">
					<input v-model="user.password" password type="password" class="input" placeholder="请输入密码" maxlength="16">
				</uni-row>
				<uni-row style="margin-top: 3vh;">
					<move-verify class="login_verify" @result='verifyResult' ref="verifyElement" ></move-verify>
				</uni-row>
				<uni-row style="margin-top: 5vh;">
					<button class="login_button" type="primary" @click="login">登录</button>
				</uni-row>
				<uni-row style="margin-top: 3vh;">
					<view style="display: flex;flex-direction: column;align-items: center;font-size: 13px;color: gray;">
						<text @click="toRegister">注册新账号</text>
					</view>
				</uni-row>
			</uni-col>
		</uni-row>
		<uni-row v-if="!isLogin">
			<uni-col :span="20" :offset="2">
				<uni-row style="margin-top: 15vh;">
					<view style="font-size: 28px;">注册</view>
				</uni-row>
				<uni-row style="margin-top: 3vh;">
					<view style="font-size: 18px;color: #3F536E;">欢迎使用DKJZ!</view>
				</uni-row>
				<uni-row style="margin-top: 5vh;">
					<input v-model="user.username" type="number" class="input" placeholder="请输入用户名" maxlength="11"/>
				</uni-row>
				<uni-row style="margin-top: 3vh;">
					<input v-model="user.password" type="password" class="input" placeholder="请输入密码" maxlength="16">
				</uni-row>
				<uni-row style="margin-top: 3vh;">
					<input v-model="repeatPassword" type="password" class="input" placeholder="请确认密码" maxlength="16">
				</uni-row>
				<uni-row style="margin-top: 3vh;">
					<move-verify class="login_verify" @result='verifyResult' ref="verifyElement" ></move-verify>
				</uni-row>
				<uni-row style="margin-top: 5vh;">
					<button class="login_button" type="primary"   @click="register">注册</button>
				</uni-row>
				<uni-row style="margin-top: 3vh;">
					<view style="display: flex;flex-direction: column;align-items: center;font-size: 13px;color: gray;">
						<text @click="toLogin">去登录</text>
					</view>
				</uni-row>
			</uni-col>
		</uni-row>
	</view>
</template>

<script>
	import {loginByUsername,fetchCurrentUserInfo,registerByUsername} from "@/common/api.js"
	import moveVerify from "@/components/helang-moveVerify/helang-moveVerify.vue"
	export default {
		components: {
			"move-verify":moveVerify
		},
		data() {
			return {
				verify:{},
				isLogin:true,
				user:{
					username:"",
					password:"",
				},
				repeatPassword:""
			}
		},
		methods: {
			 /* 校验结果回调函数 */
			verifyResult(res){
				this.verify = res
			},
			/* 校验插件重置 */
			verifyReset(){
				this.$refs.verifyElement.reset();
			},
			/* 登录 */
			login() {
				if(!this.verify.flag) {
					//未滑动验证码
					this.commonApi.toastMsgWithTitle("请滑动验证")
					return
				}
				if(!this.verifyUsernamePassword('login')) {
					//用户名密码校验不通过
					return
				}
				loginByUsername(this.user).then(data => {
					//data为一个数组，数组第一项为错误信息，第二项为返回数据
					//var [error, res]  = data;
					//console.log(data)
					const res = data[1]
					if(res.data.code != 200) {
						this.commonApi.toastMsgWithTitle(res.data.msg)
						return
					}
					this.commonApi.setUsername("username",this.user.username)
					this.commonApi.setUserToken(this.user.username,res.data.data)
					fetchCurrentUserInfo().then(data => {
						const res = data[1]
						this.commonApi.setUserInfo("user",res.data.data)
						uni.switchTab({
						    url: '/pages/user/user'
						}); 
					}) 
				})
			},
			/* 注册 */
			register() {
				if(!this.verify.flag) {
					//未滑动验证码
					this.commonApi.toastMsgWithTitle("请滑动验证")
					return
				}
				if(!this.verifyUsernamePassword()) {
					//用户名密码校验不通过
					return
				}
				registerByUsername(this.user).then(data => {
					const res = data[1]
					if(res.data.code != 200) {
						this.commonApi.toastMsgWithTitle(res.data.msg)
						return
					}
					this.commonApi.toastMsgWithTitle("注册成功")
					this.toLogin()
				})
			},
			/* 校验用户名密码 */
			verifyUsernamePassword(operation) {
				if(this.user.username===null||this.user.username==="") {
					this.commonApi.toastMsgWithTitle("请输入账号")
					return false
				}
				if(this.user.password===null||this.user.password==="") {
					this.commonApi.toastMsgWithTitle("请输入密码")
					return false
				}
				if(operation === 'login') return true
				if(this.repeatPassword===null||this.repeatPassword==="") {
					this.commonApi.toastMsgWithTitle("请确认密码")
					return false
				}
				if(this.repeatPassword !== this.user.password) {
					this.commonApi.toastMsgWithTitle("两次输入密码不正确")
					return false
				}
				return true
			},
			toRegister() {
				this.isLogin = false
				this.verify.flag = false
			},
			toLogin() {
				this.isLogin = true
				this.verify.flag = false
			}
			
		}
	}
</script>

<style>
	.input{
		border:0;
		border-bottom:1px solid #ececec;
		background:;
		height: 50px;
		line-height: 50px;
	}
	
	
	.icon_wrapper{
		display: flex;
		flex-direction: column;
		align-items: center;
		
	}
	.icon_img{
		border-radius: 60px;
		width: 90px;
		height: 90px;
	}
	.login_input{
		/* background-color: #dcdcdc; */
		font-size: 18px;
		border-radius: 30px;
		/* border-color: #dcdcdc; */
		border: 1px solid #dcdcdc;
		height: 3em;
		text-align: center;
	}
	.login_verify{
		/* border-radius: 30px; */
		/* height: 3em; */
	}
	.login_button{
		border-radius: 30px;
		height: 40px;
		font-size: 16px;
		line-height: 40px;
	}
</style>
