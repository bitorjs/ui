const Qs = require('qs');

let r = Qs.parse('a.b.c.d.hasOwnProperty=b', {
  plainObjects: true
});

r = Qs.parse('a.hasOwnProperty=b', {
  plainObjects: true
});

r = Qs.parse('a.hasOwnProperty=b', {
  allowPrototypes: true
});


r = Qs.parse('a%5Bb%5D=c');

r = Qs.parse('a[b][c][d][e][f][g][h][i]=j', {
  depth: 1
});

r = Qs.parse('a.b.c.d=b', {
  depth: 10,
  allowDots: true
});


console.log(r)