<template>
	<view>
		<uni-list>
			<uni-list-item link @click="chooseImg">
				<text slot="header" class="slot-title">头像</text>
				<template slot="footer">
					<image style="width: 50px;height: 50px;" src="https://i0.hdslb.com/bfs/face/1c75ef458888bcad82bd32ac5cd43751031ba47a.jpg@160w_160h_1c_1s.webp" mode="widthFix"/>
				</template>
			</uni-list-item>
			<uni-list-item link @click="confirmDialog()">
				<text slot="header" class="slot-title">昵称</text>
				<template slot="footer">
					<text class="solt-text">Zqh</text>
				</template>
			</uni-list-item>
			<uni-list-item link>
				<text slot="header" class="slot-title">账号</text>
				<template slot="footer">
					<text class="solt-text">100635545453524</text>
				</template>
			</uni-list-item>
			<uni-list-item link>
				<text slot="header" class="slot-title">认证信息</text>
				<template slot="footer">
					<text class="solt-text">未认证</text>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-popup ref="dialogInput" type="dialog" >
			<uni-popup-dialog mode="input" title="修改昵称" value="Zqh" placeholder="请输入昵称" @confirm="dialogInputConfirm"/>
		</uni-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			confirmDialog() {
				this.$refs['dialogInput'].open()
			},
			dialogConfirm(done) {
				/* this.$refs['popupMessage'].open() */
				done()  		// 需要执行 done 才能关闭对话框
			},
			dialogInputConfirm(done, val) {
				uni.showLoading({
					title: '修改中'
				})
				this.value = val
				setTimeout(() => {
					uni.hideLoading()
					done() // 关闭窗口后，恢复默认内容
				}, 1000)
			},
			chooseImg() {
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册选择
				    success: function (res) {
						let imgFiles = res.tempFilePaths   //图片的本地文件路径列表
						console.log('本地地址', imgFiles)
						//this.uploadTheImg(imgFiles)
				        console.log(JSON.stringify(res.tempFilePaths));
				    }
				});
			},
			 //上传图片
			uploadTheImg(imgFiles){
				uni.uploadFile({
					url: `XXXXXX`,   //后端用于处理图片并返回图片地址的接口
					header:{
						"Content-Type": "multipart/form-data", // formdata提交格式
					},
					filePath: imgFiles[0],
					name: 'uploadfile', // 默认
					formData: {  // 其他的formdata参数
						fileType: '2',
						uid: '10001',
						fileContainerName: 'default'
					},
					success: res => {
						let data=JSON.parse(res.data)   //返回的是字符串，需要转成对象格式，打印data如下图
						if(data.code==200){
							console.log(data.msg)  //图片地址
						}
					},
					fail: () => {}
				})
			}
		}
	}
</script>

<style>
	.slot-title {
		/* flex: 1; */
		font-size: 16px;
		font-weight: 500;
		/* color: #4cd964; */
		/* margin-right: 10px; */
	}
	.solt-text{
		color: gray;
	}
</style>
