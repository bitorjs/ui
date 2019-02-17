function composeObject(json, k) {
  let obj = k == 'location' ? '\t' : k === '' ? `\n${k}\n` : `\n${k} {\n`;
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const item = json[key];
      if (Object.prototype.toString.call(item) === '[object Object]') {
        // debugger
        if (k === 'location') {
          obj += '\t' + composeObject(item, `\t${k} ${key}`)
        } else {
          obj += '\t' + composeObject(item, key);
        }
      } else if (Object.prototype.toString.call(item) === '[object Array]') {

        item.map(i => {
          obj += key === 'proxy_set_header' ? `\t${key} ${i};\n` : ('\t' + composeObject(i, key));
        })
      } else {
        obj += `\t${key} ${item};\n`
      }
    }
  }
  obj += k == 'location' ? '\t' : k === '' ? '\n' : "}\n";
  return obj;
}


export default (configJson) => {
  let responce = `\n${composeObject(configJson, '')}\n`;
  console.log('==', responce)
  return responce;
}