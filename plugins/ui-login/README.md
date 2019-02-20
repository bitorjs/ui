# 通过js sdk 来进行第三方登录及授权(微博，微信，qq)

## 微博第三方登录及授权

#### 注册申请appkey

1. 打开微博开发者平台<http://open.weibo.com/development> 

1. 点击创建微链接 

1. 选择类型(选择网站接入) 

1. 填写各项信息，并把对应的meta复制并放在html的head内(一定要绑定域名并设置回调地址) 

`<meta property="wb:webmaster" content="xxxxxxx" />`

1. 在html内引入微博api(debug=true是调试模式，可以返回对应的信息) 

`<script type="text/javascript" src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=你的appkey&debug=true" charset="utf-8"></script>`

#### 编写js代码

```javascript
if(WB2.checkLogin()){//检查是否已登录
    WB2.logout(function(){//退出登录方法
        //回调方法
    });
}
WB2.login(function(){//登录授权
    WB2.anyWhere(function(W){
        W.parseCMD('/account/get_uid.json',function(oResult1,bStatus){//获取用户uid
            if(bStatus){
                W.parseCMD('/users/show.json',function(oResult2,bStatus){//通过uid获取用户信息
                    if(bStatus){
                        var args = {
                            openid:oResult2.id,//获取用户openid
                            access_token:WB2.oauthData.access_token,//获取用户access_token
                            username:oResult2.name,//获取用户名
                            userHeadImg:oResult2.profile_image_url,//获取用户微博头像
                        }
                        //然后根据实际情况进行自己网站的一些认证处理
                    }
                },{uid:oResult1.uid},{method:'get',cache_time:30});
            }
        },{},{method:'get',cache_time:30});//默认是post请求方法
    });
});
```

## QQ第三方登录及授权

#### 注册申请id

1. 打开腾讯开放平台<http://open.qq.com/reg> 

1. 填写各项信息获得appid和appkey 3.引入js文件

 `<script id="qq" type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="你自己的appid" charset="utf-8"></script>`

#### 编写js代码

```javascript
if(QC.Login.check()){//检查是否已登录
    QC.Login.signOut();退出登录
}
QC.login({
    btnId:"",//插入按钮的节点id，必选,可为空字符串
    scope:"all",//用户需要确认的scope授权项，可选，默认all
    size: "A_XL"//按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
},function(reqData,opts){
    //登录成功回调方法
    QC.Login.getMe(function(openId,accessToken){
        var args = {
            openid:openId,
            userHeadImg:reqData.figureurl_qq_2,
            access_token:accessToken,
        };
    });
    QC.api('get_user_info',{}).success(function(userdata){
        //可以获得用户的各种相关信息，如用户昵称
        var username = userdata.data.nickname;
    });
},function(opts){
    //注销成功回调方法
});
```

## 微信第三方登录及授权

#### 注册申请id

1. 打开微信开放平台<https://open.weixin.qq.com/cgi-bin/frame?t=home/web_tmpl&lang=zh_CN> 

1. 填写各项信息并获得appid 

1. 由于微信是需要用手机扫二维码登录的，所以可以通过直接打开新窗口的方式来让用户去扫码登录，因此无需引用js相关文件

#### 编写js代码

```javascript
var path = 'http://www.xxxx.com';//登录后回调的地址 
var appid = 'xxxxxxxxx';//注册申请的appid 
window.open('https://open.weixin.qq.com/connect/qrconnect?appid='+appid+'&redirect_uri=path&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect');//代开二维码页面，扫码成功后会回调到path地址 
//然后可以通过地址栏得到code参数的值，可以通过code值来根据需要进行进一步的操作
```

