<template>
	<view>
		<uni-collapse accordion>
			<uni-card isShadow="true" v-for="(gzz,index) in gzzlist" :key="gzz.id" :style="{'margin-bottom':index===gzzlist.length-1?'16vh':'1vh'}">
				<uni-row>
					<uni-col :span="18">
						<text style="font-size: 20px;font-weight: 600;">{{gzz.name}}</text>
					</uni-col>
					<uni-col :span="6">
						<uni-tag v-if="gzz.enabled===true" inverted circle size="normal" type="royal" text="启用中" @click="enabled_gzz(false,gzz.id)"/>
						<uni-tag v-else inverted circle size="normal" type="default" text="未启用"  @click="enabled_gzz(true,gzz.id)"/>
					</uni-col>
				</uni-row>
				<uni-row style="margin-top: 30px;">
					<view @click="gzz_detail(gzz.id)">
						<uni-collapse-item title="点击查看详情" show-animation>
							<view v-if="gzxlist.length > 0" >
								<uni-row v-for="(gzx,index) in gzxlist" :key="gzx.id" class="content">
									<uni-col :span="12">{{gzx.name}}</uni-col>
									<uni-col :span="12">{{gzx.startTime}} - {{gzx.endTime}}</uni-col>
								</uni-row>
							</view>
							<view v-else class="col_center content">
								<text>暂无配置项</text>
							</view>
						</uni-collapse-item>
					</view>
				</uni-row>
			</uni-card>
			
		</uni-collapse>
		
		<view >
			<uni-fab
			:pattern="pattern"
			:content="content"
			horizontal="right"
			vertical="bottom"
			direction="horizontal"
			:popMenu="true"
			@trigger="trigger"
			@fabClick="fabClick"
		/>
		</view>
		
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog mode="base" type="info" title="提示" :content="dialog_content" :duration="2000" @close="dialog_close" @confirm="dialog_confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {fetchWithData,postWithData} from "@/common/api.js"
	export default {
		data() {
			return {
				pattern: {
					color: '#3c3e49',
					backgroundColor: '#FFFFFF',
					selectedColor: '#007AFF',
					buttonColor:'#007bfa'
				},
				content: [
					/* {
						iconPath: '/static/template.png',
						selectedIconPath: '/static/templateHL.png',
						text: '添加规则组',
						active: false
					} */
				],
				gzzlist:[],
				gzxlist:[],
				dialog_content:"",
				enabled_id:""


			}
		},
		methods: {
			trigger(e) {
				console.log(e)
				this.content[e.index].active = true
				uni.navigateTo({
					url:"gzpz/gzpz"
				})
			},
			fabClick() {
				uni.navigateTo({
					url:"gzpz/gzpz",
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			dialog_close() {
				this.enabled_id = ""
			},
			dialog_confirm() {
				this.do_enabled_gzz()
			},
			load_gzzList() {
				fetchWithData("/api/daka/gzz/list",null).then(data=>{
					const res = data[1]
					if(res.data.code != 200) {
						this.commonApi.toastMsgWithTitle(res.data.msg)
						return
					}
					this.gzzlist = res.data.data
				})
				
			},
			gzz_detail(id) {
				this.gzxlist = []
				fetchWithData("/api/daka/gzx/"+id+"/list",null).then(data=>{
					const res = data[1]
					if(res.data.code != 200) {
						this.commonApi.toastMsgWithTitle(res.data.msg)
						return
					}
					
					this.gzxlist = res.data.data
				})
				
			},
			enabled_gzz(enabled,id) {
				if(enabled) this.dialog_content = "确认启用此配置项吗"
				else this.dialog_content = "确认禁用此配置项吗"
				this.enabled_id = id
				this.$refs.popup.open()
			},
			do_enabled_gzz() {
				postWithData("/api/daka/gzz/"+this.enabled_id+"/enabled",null).then(data=>{
					const res = data[1]
					if(res.data.code != 200) {
						this.commonApi.toastMsgWithTitle(res.data.msg)
						return
					}
					this.commonApi.toastMsgWithTitle("操作成功")
					this.load_gzzList()
					this.enabled_id = ""
				})
			}
		},
		onShow() {
			this.load_gzzList()
		}
	}
</script>

<style>
	.content-box {
		/* flex: 1; */
		height: 44px;
		line-height: 44px;
		/* padding: 0 15px; */
		/* position: relative; */
		background-color: #fff;
		/* border: 1px solid #f5f5f5; */

	}
	.content {
		padding: 15px;
		font-size: 14px;
		line-height: 20px;
		background-color: #f9f9f9;
		color: #666;
	}
	.col_center{
		display: flex;
		flex-direction: column;
		align-items: center;
	}

</style>
