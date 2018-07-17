var m1 = require('./m1');
console.log(typeof m1, m1.name, m1.type);

var m2 = require('./m2');
var kim = m2('ki', 10);
var lee = m2('lee', 20);
var hong = require('./m2')('hong', 30);

console.log(typeof m2);
console.log(kim.name, kim.age);
console.log(lee.name, lee.age);
console.log(hong.name, hong.age);

var m3 = require('./m3');
var score1 = m3({kor: 10, eng:10});
var score2 = m3({kor: 20, eng:20});

console.log(`sum: ${score1.sum()}, avg: ${score1.avg()}`);
console.log(`sum: ${score2.sum()}, avg: ${score2.avg()}`);


var http = require('./m4');
var fs = require('./m4');
var url = require('./m4');
http.createServer(function(req, res){});
fs.readFile('hello.html', function(err, data){});
url.parse('http://localhost:1234/hello.html?name=kim');

// var logger = require('./m5')({type: 'console'});
var logger = require('./m5')({type: 'file', path: 'log.txt'});
logger('접속.');
logger('접속중....');
logger('종료.');