function parseSingle(recored, initObj) {
  // let list = recored.match(/[^{};]+:[^{};]+/g);
  let list = recored.match(/[^{};]+/g);
  if (list) {
    list.reduce((ret, item) => {
      item.match(/(\S+"):("[^;]+)/);
      let k = RegExp.$1;
      let v = RegExp.$2;
      if(item.indexOf(':')===-1) {
        ret[item]=item;
      } else if (ret[k]) {
        let old = ret[k];
        if (Object.prototype.toString.call(old) !== '[object Array]') {
          ret[k] = [old];
        }
        ret[k].push(v);
      } else {
        ret[k] = v;
      }
      return ret;
    }, initObj)
  }

  return initObj;
}


export default (config) => {
  let responce = {};

  let m = config;
  m = m.replace(/\n*\s*#.*/g, '');
  m = m.replace(/\s*\n+\s*/g, '');
  m = m.replace(/\s+/g, ' ');
  m = m.replace(/\s*;\s*/g, ';');
  m = m.replace(/\s*{\s*/g, '{');
  m = m.replace(/(\S+){/g, '$1 {');
  m = m.replace(/\s*}\s*/g, '}');

  m = m.replace(/"/g, '`');
  m = m.replace(/([\w_]+)((\s[^{};]+)+);/g, '"$1":"$2";'); //
  m = m.replace(/([^{};]+){/g, '"$1":{');
  //
  m = m.replace(/}/g, '},')
  m = m.replace(/\s*"\s*`\s*/g, '"')
  m = m.replace(/\s*`\s*"\s*/g, '"')
  m = m.replace(/\s*"\s*/g, '"')

  let signleBlock = m.match(/{([^{};]+;)*}/g) || []
  // debugger
  signleBlock.forEach(item => {
    let t = parseSingle(item, {}),
      ret = JSON.stringify(t).replace(/\\"/g, '');
    m = m.replace(item, ret);
  });
  let servs = m.match(/"server":({[^{}]*([^{}]+{[^{}]*})+[^{}]*})/g) || [];
  let server = '';
  servs.forEach(s => {
    s = s.replace(/"server":({[^{}]*([^{}]+{[^{}]*})+[^{}]*})/, '$1,')
    server += s;
  })

  m = m.replace(/"server":({[^{}]*([^{}]+{[^{}]*})+[^{}]*})/g, `"server":[${server}]`);

  m = m.replace(/;/g, ',')
  try {
    responce = (new Function(`return {${m}}`))();
  } catch (err) {
    responce = {}
  }

  return JSON.stringify(responce, null, ' ');
}