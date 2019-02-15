


function composeObject(json, k) {
  let obj = k == 'location'?'':`\n${k} {\n`;
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const item = json[key];
      if(Object.prototype.toString.call(item)==='[object Object]') {
        // debugger
        if(k==='location') {
          obj+=composeObject(item, `${k} ${key}`)
        } else {
          obj+=composeObject(item, key);
        }
      }else if(Object.prototype.toString.call(item)==='[object Array]') {

        item.map(i=>{
          obj+= key === 'proxy_set_header'? `${key} ${i};\n` : composeObject(i, key);
        })
      } else {
        obj+= `${key} ${item};\n`
      }
    }
  }
  obj+=  k == 'location'?'':"}\n";
  return obj;
}


export default (configJson)=>{
  let responce = `\n${composeObject(configJson, '')}\n`;
  console.log(responce) 
}