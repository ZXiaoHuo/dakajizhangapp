/* 
	全局通用API
 */

const toastMsg = (title,icon,duration) => {
	var title = title
	var icon = icon
	var duration = duration
	if(duration==null || duration=="") {
		duration = 2000
	}
	uni.showToast({
		title:title,
		icon:icon,
		duration:duration
	})
}

const toastMsgWithTitle = title => {
	uni.showToast({
		title:title,
		icon:"none",
		duration:2000
	})
}


/* ==================================Store============================== */

/* 
登录后保存用户名

"username":"username"

*/
const setUsername = (key,value) => {
	try {
	    uni.setStorageSync(key, value);
		console.log("用户名存储",key,"value",value)					
	} catch (e) {
		console.log("setUsername",e)
	}
}
const getUsername = (key) => {
	try {
	    const value = uni.getStorageSync(key);
		console.log("用户名获取",key,"value",value)		
		return value
	} catch (e) {
		console.log("setUsername",e)
	}
}

/* 
登录后保存用户token

"username":"token"

*/
const setUserToken = (key,value) => {
	try {
	    uni.setStorageSync(key, value);
		console.log("用户Token存储",key,"value",value)					
	} catch (e) {
		console.log("setUserToken",e)
	}
}
const getUserToken = () => {
	try {
		const username = uni.getStorageSync("username")
		if(username === null) return null
		const value = uni.getStorageSync(username)
		console.log("用户Token获取",value)		
		return value
	} catch (e) {
		console.log("getUserToken",e)
	}
}
const removeUserToken = (key) => {
	try {
	    uni.removeStorageSync(key);
	} catch (e) {
	    console.log("removeUserToken",e)
	}
}

/* 保存当前用户 

"user":{
	"username":"",
	xxxx
}

*/
const setUserInfo = (key,value) => {
	try {
	    uni.setStorageSync(key, value);
		console.log("保存当前用户",key,"value",value)					
	} catch (e) {
		console.log("setUserInfo",e)
	}
}
const getUserInfo = (key) => {
	try {
		const value = uni.getStorageSync(key)
		console.log("获取当前用户",key,"value",value)		
		return value
	} catch (e) {
		console.log("getUserInfo",e)
	}
}


/* 
 获取存储状态
 */
const storeInfo = () => {
	try {
		const res = uni.getStorageInfoSync();
		console.log(res.keys);
		console.log(res.currentSize);
		console.log(res.limitSize);
	} catch (e) {
		console.log("storeInfo",e)
	}
}




/* ===================================================== */

const modal = (title,content,callback) => {
	uni.showModal({
	    title: title,
	    content: content,
	    success: callback
	});
}

const mySetStorageSync = (key,value) => {
	try {
	    uni.setStorageSync(Key, value);
						
	} catch (e) {
	    // error
	}
}

var appSecret = () => {
	return "zqh"
}

var appId = () => {
	return "dakajizhang"
}

export default{
	toastMsg,
	toastMsgWithTitle,
	setUserToken,
	getUserToken,
	removeUserToken,
	setUserInfo,
	getUserInfo,
	setUsername,
	getUsername
}