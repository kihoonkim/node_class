var fs = require('fs');

console.log('m5는 일반적인 모듈 작성 패턴.(확장모듈)');

function logger(option) {
  if(option.type === 'console') {
    return function(msg){
      console.log(msg);
    }
  }
  else if(option.type === 'file'){
    var file = fs.createWriteStream(option.path, {flags: 'a'});    
    return function(msg) {
      file.write(msg);
      file.write('\n');
    }
  }  
}

module.exports = logger;