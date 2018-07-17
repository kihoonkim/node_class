console.log('m4는 일반적인 모듈 작성 패턴.(core 모듈)');

var someObj = {
  createServer: function(fn){},
  readFile: function(path, fn){},
  parse: function(url){}
};

module.exports = someObj;
