import wx from 'weixin-js-sdk';

const path = require('path')

console.log('*** share start ***');

console.log('***      module.id = ' + module.id + ' ***', path.relative(path.dirname(module.id),'./'));
console.log('***           __filename = ' + __filename + ' ***');
console.log('***            __dirname = ' + __dirname + ' ***');
console.log('***        process.cwd() = ' + process.cwd() + ' ***');
console.log('*** require.main.filename= ' + require.main.filename + ' ***');
console.log('*** require.main.is= ' , require.main );
// console.log(require.resolve(`${path.relative(path.dirname(module.id),'./')}/config/a.js`))
console.log('*** share end ***');

// let t = import(`./${path.relative(module.id,'./')}/test/test-qs.js`);
// import('./../../config/a.js')

// console.log(require.resolve('/config/a.js'))
// console.log(require.resolve(process.cwd()))

export default (app, options)=>{
    console.log(require.cache, require.main.filename, process.installPrefix)
  //wx是引入的微信sdk
  wx.config({
    debug: options.debug||false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: options.appId, // 必填，公众号的唯一标识
    timestamp: options.timestamp, // 必填，生成签名的时间戳
    nonceStr: options.nonceStr, // 必填，生成签名的随机串
    signature: options.signature,// 必填，签名，见附录1
    jsApiList: options.jsApiList||[] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });//通过config接口注入权限验证配置

  wx.ready(function() { //通过ready接口处理成功验证
  // config信息验证成功后会执行ready方法
      wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
          title: options.title||'标题', // 分享标题
          desc: options.desc||'描述', // 分享描述
          link: options.link||'链接', // 分享链接
          imgUrl: options.imgUrl||'图片', // 分享图标
          type: options.type||'', // 分享类型,music、video或link，不填默认为link
          dataUrl: options.dataUrl||'', // 如果type是music或video，则要提供数据链接，默认为空
          success: options.success ||function() { },// 用户确认分享后执行的回调函数 
          cancel: options.cancel || function() { } // 用户取消分享后执行的回调函数
      });
    wx.onMenuShareTimeline({ //分享朋友圈
          title: options.title||'标题', // 分享标题
          desc: options.desc||'描述', // 分享描述
          link: options.link||'链接',
          imgUrl: options.imgUrl||'图片', // 分享图标
          success: options.success ||function() { },// 用户确认分享后执行的回调函数 
          cancel: options.cancel || function() { } // 用户取消分享后执行的回调函数
      });
  });
  wx.error(function(res){//通过error接口处理失败验证
      // config信息验证失败会执行error函数
  });
}