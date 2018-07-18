var fs = require('fs');

function mylogger(info) {
  if(info.type === 'file') {
    var logfile = fs.createWriteStream(info.path||'log.txt', {flags: 'a'});
  }
  
  return function(req, res) {
    var logMsg = `[${Date()}] ${res.statusCode} ${req.url}\n`;
    if(info.type === 'file') {
      logfile.write(logMsg);
    }
    else {
      console.log(logMsg);
    }
  };
}

module.exports = mylogger;