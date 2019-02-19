function composeObject(json, k) {
  let obj =  k === '' ? `\n${k}\n` : `\n${k} {\n`;
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const item = json[key];
      if (Object.prototype.toString.call(item) === '[object Object]') {
          obj += '\t' + composeObject(item, key);
      } else if (Object.prototype.toString.call(item) === '[object Array]') {
        item.map(i => {
          obj +=  Object.prototype.toString.call(i) === '[object String]' ? `\t${key} ${i};\n` : ('\t' + composeObject(i, key));
        })
      } else {
        if(key===item) {
          obj += `\t${key};\n`
        } else {
          obj += `\t${key} ${item};\n`
        }
      }
    }
  }
  obj += k === '' ? '\n' : "}\n";
  return obj;
}


export default (configJson) => {
  let responce = `\n${composeObject(configJson, '')}\n`;
  console.log('==', responce)
  return responce;
}