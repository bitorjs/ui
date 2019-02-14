import config from './config';

let responce = {
  events: {},
  http: {
    server: [{
        location: [

        ]
      }

    ]
  }
};

let r = config.replace(/\n*\s*#.*/g, '');
let t = r.replace(/\s*\n+\s*/g, '');
let m = t.replace(/\s+/g, " ")
let header = m.replace(/events\s{[^}]*}/g, '').replace(/http\s{.*}+/g, '');
let events = m.match(/(events)\s{[^}]*}/g)[0]
let http = m.replace(/events\s{[^}]*}/g, '').match(/(http)\s{.*/g)[0]
let servers = http.match(/server\b\s?{((?!server\b).)*/g);
servers.map(server => {
  let serv = {

  }
  let locations = server.match(/location\s[^{]*{[^}]*}/g);

  let locs = []
  locations.map(local => {
    let r = local.match(/location\s([\w\/=]+\s)+(.+)/);

    debugger
    locs.push({

    })
  })

  serv.location = locs;
  responce.http.server.push(serv)
})



function single(str) {
  // key key key;
  return str.match(/((\w+_?)+\s)+[\w\.\*\/-]+;/g, '')
}


debugger
console.log(m) //.*\n\r