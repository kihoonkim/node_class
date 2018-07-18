var fs = require('fs');

function mylogger(info) {
  if(info.type === 'file') {
    var logfile = fs.createWriteStream(info.path||'log.txt', {flags: 'a'});
  }
  
  return function(req, res, next) {
    // connect의 미들웨어 작성 규칙
    // 1. req, res, rext 를 전달받는 함수
    // 2. 다음 둘 중 하나의 작업을 한다.
    //   - 다음 미들웨어를 호출한다. next()
    //   - res로 응답한다.

    var logMsg = `[${Date()}] ${res.statusCode} ${req.url}\n`;
    if(info.type === 'file') {
      logfile.write(logMsg);
    }
    else {
      console.log(logMsg);
    }

    next();
  };
}

module.exports = mylogger;