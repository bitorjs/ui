import config from './config';

const CommenteReg = /\n*\s*#.*/g;
const NewLineReg= /\s*\n+\s*/g
const SpaceReg = /\s+/g;
const LocationReg = /\blocation\s[^{]*{[^}]*}/g;
const ServerReg = /\bserver\s?{.*({[^{}]*})+}/g;///server\s?{([^{}]+\s{[^{}]*})+}/g;
const HeaderReg = /(events\s?{[^}]*})|(http\s?{.*{.*{.*}.*}.*})/g;
const HttpReg = /\bhttp\s?{.*{.*{.*}.*}.*}/g;
const EventReg = /\bevents\s?{[^{}]*}/g;


function parseSingle(recored, initObj){
  let list = recored.match(/[^;]+/g);//(/\S+[^;]+\S*/g)
  if (list) {
    list.reduce((ret, item)=>{
      item.match(/(\S+)\s([^;]+)/);
      // if(item.indexOf('expires 15d')>-1) debugger
      let k = RegExp.$1;
      let v = RegExp.$2;
      if(ret[k]) {
        let old = ret[k];
        if(Object.prototype.toString.call(old)!=='[object Array]') {
          ret[k] = [old];
        }
        ret[k].push(v);
      }
      else {
        ret[k] = v;
      }
      return ret;
    }, initObj)
  }

  return initObj;
}


export default () => {
  let responce = {
    events: {},
    http: {
      server: []
    }
  };

  let m = config.replace(CommenteReg, '');
  m = m.replace(NewLineReg, '');
  m = m.replace(SpaceReg, " ");
  m = m.replace(/\s*;\s*/g,';');
  m = m.replace(/\s*{\s*/g,' {');
  m = m.replace(/\s*}\s*/g,'}');
  let events = m.match(EventReg)[0];
  let http = m.match(HttpReg)[0]
  let http_left = http.replace(ServerReg,'');
  let header = m.replace(HeaderReg, '');
  let servers = http.match(ServerReg) || [];

  servers.map(server => {
    let serv = {},locs = {}
    let locations = server.match(LocationReg)||[];

    locations.map(str => {
      str.match(/\blocation\b\s?(\S+)\s((\S+)\s?)?{([^{}]*)}/);
      let arr = [];
      if (RegExp.$1) arr.push(RegExp.$1)
      if (RegExp.$3) arr.push(RegExp.$3)
      locs[`${arr.join(' ')}`] = parseSingle(RegExp.$4, {});
    })
    serv.location = locs;
    server.replace(LocationReg, '').match(/server\s{([^{}]*)}/);
    responce.http.server.push(parseSingle(RegExp.$1,serv))
  })


  http_left.match(/http\s?{([^{}]*)}/)
  parseSingle(RegExp.$1, responce.http)

  events.match(/events\s?{([^{}]*)}/)
  parseSingle(RegExp.$1, responce.events)
  parseSingle(header, responce)


  return JSON.stringify( responce, null, ' ');
}