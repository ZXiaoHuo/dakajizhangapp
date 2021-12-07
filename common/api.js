/* 
	全局请求API
 */


/* 登录 */
export const loginByUsername = data => {
	return uni.request({
		url: '/api/login', 
		data: data,
		method:"POST",
		header:{
			"content-type":"application/x-www-form-urlencoded"
		}
	})
}
/* 注册 */
export const registerByUsername = data => {
	return uni.request({
		url: '/api/user/save', 
		data: data,
		method:"POST",
		/* header:{
			"content-type":"application/x-www-form-urlencoded"
		} */
	})
}
/* 获取当前用户信息 */
export const fetchCurrentUserInfo = () => {
	return uni.request({
		url: '/api/user/currentuser',
		header:{
			"Authorization":""
		}
	})
}

export const fetchWithData = (url,data) => {
	return uni.request({
		url: url,
		data:data,
		header:{
			"Authorization":""
		}
	})
}

export const postWithData = (url,data) => {
	return uni.request({
		url: url,
		data:data,
		method:'POST',
		header:{
			"Authorization":""
		}
	})
}