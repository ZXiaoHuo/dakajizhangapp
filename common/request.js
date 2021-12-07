/* 
	全局请求拦截处理
 110.40.170.199
 */
import commonApi from "@/common/common_api.js"
//#ifdef H5
const baseUrl = 'http://110.40.170.199:8081'//'http://127.0.0.1:8081'
//#endif
//#ifdef APP-PLUS
const baseUrl = 'http://110.40.170.199:8081'//'http://192.168.2.164:8081'//192.168.1.194
//#endif
uni.addInterceptor('request', {
	invoke(args) {
		// request 触发前拼接 url 添加token
		const token = commonApi.getUserToken()
		if(token !== null) {
			args.header.Authorization = "Bearer " + token
		}
		
		args.url = baseUrl+args.url
		console.log(args.header)
		console.log("interceptor-invoke",args.url)
	},
	success(args) {
	  
		if(args.statusCode === 401) {
			console.log(args.statusCode)
			const username = commonApi.getUsername("username")
			commonApi.removeUserToken(username)
			commonApi.setUserInfo("user",null)
			commonApi.setUsername("username",null)
		}
		console.log("interceptor-success",args)
	}, 
	fail(err) {
		console.log('interceptor-fail',err)
	}, 
	complete(res) {
		console.log('interceptor-complete',res)
	}
})