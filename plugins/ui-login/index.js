// var HashMap = require('hashmap');

// var map = new HashMap();
// map.set("1", "string one");
// map.set(1, "number one");
// map.forEach(function(value, key) {
//   console.log(key + " : " + value);
// });

// debugger
export default (app, options) =>{
  
  app.login = login;
}

/**
 * 三方登录
 * @param {*} platform 为登陆的平台可取值为 QQ，WEIXIN，SINA 注：值不能为空，QQ为QQ登录，WEIXIN为微信登录，SINA为新浪登录；
 * @param {*} forwardurl 为登陆成功以后跳转的地址 注：可以为空，forwardurl和callbackMethod两者不能同时为空，如果两者都有值以forwardurl为主；
 * @param {*} callbackMethod 为登陆成功以后回调的js函数（回调js函数拥有一个参数）注：可以为空，forwardurl和callbackMethod两者不能同时为空，如果两者都有值以forwardurl为主；
 */
function login(platform, forwardurl, callbackMethod) {

}

/**
 * callbackMethod 实例 注： 处理登陆成功以后的第三方返回数据，r为json格式
 * @param {*} r 
 */
function loginResult(r) {
  // 例：QQ登陆返回

// { "platform": "qq",//(平台) "uid": "",//（包含平台 uid） "city": "", "gender": "", "is_yellow_vip": "", "is_yellow_year_vip": "",

// "level": "", "msg": "", "profile_image_url":"", "province": "", "screen_name": "", "vip": "0", "yellow_vip_level": "0" }
}