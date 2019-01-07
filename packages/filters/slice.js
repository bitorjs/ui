import Vue from 'vue';
/**
 * 
 * @param {String} value 非字串 返回 ‘’
 * @param {Number} start 
 * @param {Number} end 
 */
function slice(value, start, end) {
  if (Object.prototype.toString.call(value) === '[object String]')
    return value.slice(start, end)
  return '';
}

Vue.filter('slice', slice);