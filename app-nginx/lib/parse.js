import config from './config';

let responce = {
  events: {},
  http: {
    server: [{
      location: []
    }]
  }
};

let r = config.replace(/\n*\s*#.*/g, '');
let t = r.replace(/\s*\n+\s*/g, '');
let m = t.replace(/\s+/g, " ")
let header = m.replace(/events\s{[^}]*}/g, '').replace(/http\s{.*}+/g, '');
let events = m.match(/(events)\s{[^}]*}/g)[0]
let http = m.replace(/events\s{[^}]*}/g, '').match(/(http)\s{.*/g)[0]
let servers = http.match(/server\s{([^{}]*{[^{}]*}[^{}]*({[^{}]*})*)}/g);
servers.map(server => {
  let serv = {}
  let locations = server.match(/location\s[^{]*{[^}]*}/g);
  let locs = {}
  locations.map(str => {
    str.match(/location\s([\w\/=]+)\s(([\w\/\.=]+)\s)?(.*)/);


    let arr = [];
    if (RegExp.$1) arr.push(RegExp.$1)
    if (RegExp.$3) arr.push(RegExp.$3)

    let loc = {};
    let a = recored(RegExp.$4);
    if (a) {
      a.map(rec => {
        let b = rec.slice(0, -1).split(/\s/);
        let k = b.shift();
        loc[k] = b.join(' ');
      })
    }
    locs[`${arr.join(' ')}`] = loc;
  })

  let serv_left = server.replace(/location\s[^{]*{[^}]*}/g, '');
  debugger
  serv.location = locs;
  responce.http.server.push(serv)
})



function recored(str) {
  // key key key;
  return str.match(/((\w+_?)+\s)+[\w\.\*\/-]+;/g, '')
}

// /{[^{}]*}/g
// /([^{}]*{[^{}]*}[^{}]*)/
// /([^{}]*{[^{}]*}[^{}]*({[^{}]*})*)/