<template>
	<view>
		<uni-nav-bar fixed :status-bar="true" backgroundColor="#f8f8f8" title="规则组配置" left-text="返回" left-icon="back" right-text="保存"  @clickLeft="back" @clickRight="save">
		    <!-- title="规则组配置" left-icon="back" left-text="返回"-->
			<!-- <block slot="left">
				<view style="display: flex;flex-direction: row;align-items: center;">
					<uni-icons type="back" size="27"/><text>返回</text>
				</view>
			</block>
			
			<view class="input-view">
				<view style="font-weight: 600;">规则组配置</view>
			</view>
			<block slot="right">
				<view >
					<text>保存</text>
				</view>
			</block> -->
		</uni-nav-bar>
		<uni-card isShadow="true" v-for="(item,index) in pzz" :key="index">
			<uni-row>
				<uni-col :span="8" >
					<text style="color: gray;">配置项{{index+1}}</text>
				</uni-col>
				<uni-col :span="2" :offset="14">
					<uni-icons type="minus" size="20" color="red" @click="del(item,index)"></uni-icons>
				</uni-col>
			</uni-row>
			<uni-row style="margin-top: 15px;">
				<uni-col :span="6">
					<text>标题<span style="color: red;">*</span></text>
				</uni-col>
				<uni-col :span="18">
					<uni-easyinput :clearable="true" maxlength="20" @input="onInput($event,item)" :value="item.title" placeholder="请输入内容"></uni-easyinput>
				</uni-col>
			</uni-row>
			<uni-row style="margin-top: 15px;">
				<uni-col :span="6">
					<text>开始时间<span style="color: red;">*</span></text>
				</uni-col>
				<uni-col :span="18">
					<picker mode="time" :value="item.startTime" :start="item.start.start" :end="item.start.end" @change="bindStartTimeChange($event,item)">
						<uni-easyinput @focus="hideKeyboard" :clearable="true" maxlength="5" :value="item.startTime" placeholder="请选择开始时间"></uni-easyinput>
					</picker>
				</uni-col>
			</uni-row>
			<uni-row style="margin-top: 15px;">
				<uni-col :span="6">
					<text>结束时间<span style="color: red;">*</span></text>
				</uni-col>
				<uni-col :span="18">
					<picker mode="time" :value="item.endTime" :start="item.end.start" :end="item.end.end" @change="bindEndTimeChange($event,item)">
						<uni-easyinput @focus="hideKeyboard" :clearable="true" maxlength="5" :value="item.endTime" placeholder="请选择结束时间"></uni-easyinput>
					</picker>
				</uni-col>
			</uni-row>
		</uni-card>
		<uni-card isShadow="true" @click="add">
			<view style="display: flex;align-items: center;flex-direction: column;">
				<uni-icons type="plusempty" size="50"></uni-icons>
			</view>
		</uni-card>
		<!-- {{pzz}}{{pzzmc}} -->
		<uni-popup ref="messageDialog" type="dialog">
			<uni-popup-dialog mode="base" title="提示" content="配置未保存确定退出此页面" @confirm="dialogConfirm($event,'back')" @close="dialogClose" />
		</uni-popup> 
		<uni-popup ref="delPzxDialog" type="dialog">
			<uni-popup-dialog mode="base" title="提示" content="确定删除此配置项" @confirm="dialogConfirm($event,'del')" @close="dialogClose" />
		</uni-popup> 
		<uni-popup ref="inputDialog" type="dialog" >
			<uni-popup-dialog :beforeClose="true" mode="input" title="配置组名称" placeholder="请输入配置组名称" @confirm="inputDialogConfirm" @close="dialogClose"/>
		</uni-popup>
	</view>
</template>

<script>
	import {fetchWithData,postWithData} from "@/common/api.js"
	import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {uniNavBar},
		data() {
			return {
				startTime:"",
				endTime:"",
				title:"",
				pzz:[],
				name:"", //配置组名称
				delProp:{
					item:{},
					index:null
				}
			}
		},
		methods: {
			/* pop弹出窗 */
			confirmDialog(ref) {
				this.$refs[ref].open()
			},
			dialogConfirm(done,flag) {
				if(flag=='back'){
					uni.navigateBack({})
				}
				if(flag=='del') {
					this.del(this.delProp.item,this.delProp.index,'del')
				}
				 
			},
			dialogClose(done) {
				//done
				this.$refs.inputDialog.close()
			},
			inputDialogConfirm(done) {
				this.name = done
				if(this.name==='') {
					this.commonApi.toastMsgWithTitle("配置组名称未输入！")
					return
				}
				this.$refs.inputDialog.close()
				this.do_save_gzz()
			},
			/* 隐藏键盘 */
			hideKeyboard: function() {
				uni.hideKeyboard()
			},
			/* 添加配置项 */
			add: function(){
				this.pzz.push({
					startTime:"",
					endTime:"",
					name:"",
					start:{
						start:"00:00",
						end:"23:59"
					},
					end:{
						start:"00:00",
						end:"23:59"
					}
				})
				//console.log(JSON.stringify(this.pzz))
			},
			/* 删除配置项 */
			del: function(item,index,flag) {
				if(flag==null||flag=="") {
					this.delProp.item = item
					this.delProp.index = index
					this.confirmDialog("delPzxDialog")
				}else{
					this.pzz.splice(index,1)
					this.delProp.item = {}
					this.delProp.index = null
				}
				
			},
			/* 开始时间选择 */
			bindStartTimeChange: function(e,item) {
				console.log(e)
				item.end.start = e.target.value
				item.startTime = e.target.value
				if(item.endTime!=null||item.endTime!='') {
					console.log(item.endTime>e.target.value)
				}
			},
			/* 结束时间选择 */
			bindEndTimeChange: function(e,item) {
				console.log(e)
				item.start.end = e.target.value
				item.endTime = e.target.value
			},
			/* 配置项标题输入 */
			onInput(e,item){
				item.name = e
				console.log(JSON.stringify(e))
			},
			/* 回到上一页 */
			back : function() {
				if(this.pzz.length>0) {
					this.confirmDialog("messageDialog")
					return
				}
					
				uni.navigateBack({})
			},
			/* 保存并退出 */
			save : function() {
				if(this.pzz.length<=0) {
					this.commonApi.toastMsgWithTitle("未添加配置项！")
					return
				}
				var flag = true
				this.pzz.forEach((item,index) => {
					if(item.title===''||item.startTime===''||item.endTime==='') {
						this.commonApi.toastMsgWithTitle("配置项未完善！")
						flag = false
					}
				})
				if(!flag) return
				this.confirmDialog("inputDialog")
				//uni.navigateBack({})
			},
			do_save_gzz() {
				postWithData("/api/daka/gzz/save",{"name":this.name,"list":this.pzz}).then(data=>{
					const res = data[1]
					if(res.data.code != 200) {
						this.commonApi.toastMsgWithTitle(res.data.msg)
						return
					}
					this.commonApi.toastMsgWithTitle("保存成功")
					uni.navigateBack({})
				})
			}
		
			
		}
	}
</script>

<style>
	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 4px;
	}
 
	.input-view {
		display: flex;
		flex-direction: row;
		flex: 1;
		background-color: #f8f8f8;
		height: 30px;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}
	.nav-bar-input {
		height: 30px;
		line-height: 30px;
		width: 370rpx;
		padding: 0 5px;
		font-size: 14px;
		background-color: #f8f8f8;
	}

</style>
