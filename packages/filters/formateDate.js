import Vue from 'vue';
/**       
 * 对Date的扩展，将 Date 转化为指定格式的String       
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符       
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)       
 * eg:       
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423       
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04       
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04       
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04       
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18       
 */
function isType(obj) {
  return Object.prototype.toString.call(obj)
}

/**
 * 
 * @param {Date|String|Number} date 
 * @param {String} fmt 
 */
function formateDate(date, fmt) {
  console.log(date, isType(date))
  let d = null;
  switch (isType(date)) {
    case '[object Date]':
      if (date.toString() === 'Invalid Date') {
        return '';
      } else {
        d = date;
      }
      break;
    case '[object String]':
      if (new Date(date).toString() === 'Invalid Date') {
        let f = new Date(date.replace(/-/g, '/'));
        if (f.toString() === 'Invalid Date') {
          return ''
        } else {
          d = f;
        }
      } else {
        d = new Date(date);
      }
      break;
    case '[object Number]':
      if (new Date(date).toString() === 'Invalid Date') {
        return '';
      } else {
        d = new Date(date);
      }
      break;

    default:
      return '';
      break;
  }

  var o = {
    "M+": d.getMonth() + 1, //月份           
    "d+": d.getDate(), //日           
    "h+": d.getHours() % 12 == 0 ? 12 : d.getHours() % 12, //小时           
    "H+": d.getHours(), //小时           
    "m+": d.getMinutes(), //分           
    "s+": d.getSeconds(), //秒           
    "q+": Math.floor((d.getMonth() + 3) / 3), //季度           
    "S": d.getMilliseconds() //毫秒           
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[d.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}


Vue.filter('formateDate', formateDate);

// console.log(formateDate(null, 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate(undefined, 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate({}, 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate([], 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate(NaN, 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate(Infinity, 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate(0, 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate(-30010199122813, 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate('0', 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate('', 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate(String(new Date().getTime()), 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate(new Date().getTime(), 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss.S'))
// console.log(formateDate(new Date, 'yyyy-MM-dd hh:mm:ss.S'))