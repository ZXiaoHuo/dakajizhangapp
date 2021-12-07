module.exports = {
	// publicPath:'',
	// outputDir: 'dist',   //build输出目录
	// assetsDir: 'assets', //静态资源目录（js, css, img）
	// lintOnSave: false, //是否开启eslint
	devServer: {
		open: false, //是否自动弹出浏览器页面
		host: "127.0.0.1",
		port: '8084',
		https: false,   //是否使用https协议
		hotOnly: true,
		disableHostCheck: true,
		proxy: {
			// 配置跨域
			'/api': {
				target: "http://127.0.0.1:8081",// 域名
				ws: true,
				changOrigin: true,
				pathRewrite: {
					'^/api': '/api'
				},
				logLevel: 'debug',
			},
		}
	}
}