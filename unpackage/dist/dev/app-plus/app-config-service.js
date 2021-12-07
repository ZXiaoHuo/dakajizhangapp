
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/daka/daka","pages/jizhang/jizhang","pages/user/user","pages/login/login","pages/user/xtsz/xtsz","pages/user/info/info","pages/user/dkgzpz/dkgzpz","pages/user/dkgzpz/gzpz/gzpz"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","background":"#efeff4"},"tabBar":{"color":"#8a8a8a","selectedColor":"#3298ff","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"/static/icon/2/Home.png","selectedIconPath":"/static/icon/2/Home.png"},{"pagePath":"pages/daka/daka","text":"打卡","iconPath":"/static/icon/2/daka.png","selectedIconPath":"/static/icon/2/daka.png"},{"pagePath":"pages/jizhang/jizhang","text":"记账","iconPath":"/static/icon/2/jizhang.png","selectedIconPath":"/static/icon/2/jizhang.png"},{"pagePath":"pages/user/user","text":"我的","iconPath":"/static/icon/2/user.png","selectedIconPath":"/static/icon/2/user.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"dakajizhangapp","compilerVersion":"3.1.22","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","enablePullDownRefresh":true}},{"path":"/pages/daka/daka","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"打卡","enablePullDownRefresh":true,"scrollIndicator":"none"}},{"path":"/pages/jizhang/jizhang","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"记账","enablePullDownRefresh":false}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/user/xtsz/xtsz","meta":{},"window":{"navigationBarTitleText":"系统设置","enablePullDownRefresh":false}},{"path":"/pages/user/info/info","meta":{},"window":{"navigationBarTitleText":"个人信息","enablePullDownRefresh":false}},{"path":"/pages/user/dkgzpz/dkgzpz","meta":{},"window":{"navigationBarTitleText":"规则配置","enablePullDownRefresh":false,"scrollIndicator":"none"}},{"path":"/pages/user/dkgzpz/gzpz/gzpz","meta":{},"window":{"navigationBarTitleText":"规则组配置","enablePullDownRefresh":false,"titleNView":false,"scrollIndicator":"none"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
