import config from './config';

export default () => {
  let responce = {
    events: {},
    http: {
      server: []
    }
  };

  let r = config.replace(/\n*\s*#.*/g, '');
  let t = r.replace(/\s*\n+\s*/g, '');
  let m = t.replace(/\s+/g, " ")
  let events = m.match(/(events)\s{[^}]*}/g)[0]
  let http = m.match(/http\s{.*{.*{.*}.*}.*}/g)[0] //(/(http)\s{.*/g)
  let header = m.replace(/(events\s{[^}]*})|(http\s{.*{.*{.*}.*}.*})/g, '');

  let servers = http.match(/server\s{([^{}]+\s{[^{}]*})+}/g)


  servers.map(server => {
    let serv = {},locs = {}
    let locations = server.match(/\blocation\s[^{]*{[^}]*}/g);
    console.warn(server)
    locations.map(str => {
      
      str.match(/\blocation\s(\S+)\s((\S+)\s)?{([^{}]*)}/);
      let arr = [];
      if (RegExp.$1) arr.push(RegExp.$1)
      if (RegExp.$3) arr.push(RegExp.$3)

      let loc = {};
      let list = RegExp.$4.match(/[^;]+/g);
      if (list) {
        list.map(item => {
          item.match(/(\S+)\s([^;]+)/);
          let k = RegExp.$1;
          let v = RegExp.$2;
          loc[k] = v;
        })
      }
      locs[`${arr.join(' ')}`] = loc;
    })
    serv.location = locs;



    let left = server.replace(/\blocation\s[^{]*{[^}]*}/g, '').match(/server\s{([^{}]*)}/);
    let list = RegExp.$1.match(/[^;]+/g)
    // debugger
    if (list) {
      list.map(item => {
        item.match(/(\S+)\s([^;]+)/);
        let k = RegExp.$1;
        let v = RegExp.$2;
        serv[k] = v;
      })
    }

    responce.http.server.push(serv)
  })
  //

  let http_left = http.replace(/server\s{([^{}]+\s{[^{}]*})+}/g,'');
  http_left.match(/http\s{([^{}]*)}/)
  let list = RegExp.$1.match(/[^;]+/g)
  // debugger
  if (list) {
    list.map(item => {
      item.match(/(\S+)\s([^;]+)/);
      let k = RegExp.$1;
      let v = RegExp.$2;
      responce.http[k] = v;
    })
  }

  events.match(/events\s{([^{}]*)}/)
  list = RegExp.$1.match(/[^;]+/g)
  // debugger
  if (list) {
    list.map(item => {
      item.match(/(\S+)\s([^;]+)/);
      let k = RegExp.$1;
      let v = RegExp.$2;
      responce.events[k] = v;
    })
  }

  list = header.match(/[^;]+/g)
  // debugger
  if (list) {
    list.map(item => {
      item.match(/(\S+)\s([^;]+)/);
      let k = RegExp.$1;
      let v = RegExp.$2;
      responce[k] = v;
    })
  }





// debugger


  return JSON.stringify( responce, null, ' ');
}