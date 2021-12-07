<template>
	<view>
		<view v-if="!isLogin" style="display: flex;flex-direction: column;align-items: center;margin-top: 40vh;">
			<button size="mini" @click="toLogin">去登录</button>
		</view>
		<view v-if="isLogin" style="background-color: #f8f8f8;">
			<uni-row>
				<uni-col>
					<uni-calendar
					:insert="true"
					:lunar="true" 
					:selected="selected"
					@change="change"
					 />
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<uni-card :isShadow="true" :title="item.name" :extra="formatDate(item.createTime)" :note="item.startTime+'-'+item.endTime" v-for="(item,index) in dakas" :key="item.id">
						<view v-if="currentDate === formatDate(item.createTime)">
							<!-- 已经打卡 -->
							<view v-if="item.isDaka">
								<button type="primary" disabled="true" plain="true">
									<uni-icons type="checkmarkempty" color="green"></uni-icons>已打卡
								</button>
								<text style="color: gray;">打卡时间：{{item.updateTime}}</text>
							</view>
							<!-- 未到打卡时间 -->
							<view v-if="!item.isDaka && currentTime < item.startTime">
								<button type="default" plain="true" @click="daka('error',null)">
									<uni-icons type="locked"></uni-icons>打卡
								</button>
							</view>
							<!-- 超过打卡时间 -->
							<view v-if="!item.isDaka && currentTime > item.endTime">
								<button type="warn" plain="true" disabled="true">
									<uni-icons type="closeempty" color="red"></uni-icons>未打卡
								</button>
							</view>
							<!-- 可以打卡 -->
							<view v-if="!item.isDaka && (currentTime > item.startTime && currentTime < item.endTime)">
								<button type="primary" plain="true" @click="daka('success',item.id)">打卡</button>
							</view>
						</view>
						<view v-else>
							<!-- 超过打卡时间 -->
							<view v-if="item.isDaka">
								<button type="primary" disabled="true" plain="true">
									<uni-icons type="checkmarkempty" color="green"></uni-icons>已打卡
								</button>
								<text style="color: gray;">打卡时间：{{item.updateTime}}</text>
							</view>
							<view v-else>
								<button type="warn" plain="true" disabled="true">
									<uni-icons type="closeempty" color="red"></uni-icons>未打卡
								</button>
							</view>
						</view>
					</uni-card>
				</uni-col>
			</uni-row>
			<uni-popup ref="popup" type="bottom">底部弹出 Popup</uni-popup>
		</view>
	</view>
</template>

<script>
	import {fetchWithData,postWithData} from "@/common/api.js"
	export default {
		data() {
			return {
				selected:[{
					date: '2021-08-01', 
					info: '签到', 
					data: { 
						custom: '自定义信息', 
						name: '自定义消息头',
					}
				}],
				today:null,
				isLogin:false,
				dakas:[]
			}
		},
		methods: {
			change:function(event){
				this.today = event.fulldate
				this.load_daka_list(event.fulldate)
				console.log(event.fulldate)
			},
			daka:function(icon,id){
				if(icon=='error'){
					this.commonApi.toastMsgWithTitle("未到打卡时间")
				}
				if(icon=='success'){
					postWithData("/api/daka/"+id+"/do",null).then(data=>{
						const res = data[1]
						if(res.data.code != 200) {
							this.commonApi.toastMsgWithTitle(res.data.msg)
							return
						}
						this.commonApi.toastMsgWithTitle("打卡成功")
						this.load_daka_list(null)
					})
				}
			},
			toLogin() {
				uni.navigateTo({
					url:"../login/login"
				})
			},
			load_daka_list(time) {
				fetchWithData("/api/daka/list",{"createTime":time}).then(data=>{
					const res = data[1]
					if(res.data.code != 200) {
						this.commonApi.toastMsgWithTitle(res.data.msg)
						return
					}
					this.dakas = res.data.data
				})
			},
			formatDate(dateTime) {
				var oldTime = (new Date(dateTime)).getTime();
				var curTime = new Date(oldTime).format("yyyy-MM-dd");
				return curTime
			}
		},
		computed:{
			currentTime() {
				var time = new Date().format("hh:mm:ss");
				console.log("当前时间：",time)
				return time
			},
			currentDate() {
				var curDate = new Date().format("yyyy-MM-dd");
				console.log("当前时间：",curDate)
				return curDate
			}
		},
		onShow() {
			console.log("show...daka")
			const value = this.commonApi.getUserToken()
			if (value) {
				this.isLogin = true
				this.load_daka_list(null)
			}else {
				this.isLogin = false
			}
		}
	}
</script>

<style>

</style>
