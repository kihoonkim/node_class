var fs = require('fs');
var path = require('path');
var url = require('url');
var mimeTypes = require('mime');

var logfile = fs.createWriteStream('log.txt', {flags: 'a'});

var staticServer = (req, res) => {
  if(req.url === '/') {
    req.url = 'index.html';
  }

  var parseUrl = url.parse(req.url);
  var filename = path.join(__dirname, parseUrl.pathname);
  var extname = path.extname(filename).substring(1);

  fs.stat(filename, (err, status)=>{
    if(err) {
      res.writeHead(404,{'Content-Type': 'text/html;charset=utf-8'});
      res.end('<h1>지정한 파일을 찾을수 없습니다.</h1>');
    } else if(status.isFile()) {
      res.writeHead(200, {'Content-Type': mimeTypes.getType(extname) + ';charset=utf-8'});

      var filestream = fs.createReadStream(filename);
      filestream.pipe(res);
    } else {
      res.writeHead(403, {'Content-Type': mimeTypes.getType(extname) + ';charset=utf-8'});
      res.end(`<h1>${req.url} directory access is forbidden.</h1>`);
    }

    logfile.write(`[${Date()}] ${res.statusCode} ${req.url}\n`);
  });
};

module.exports = staticServer;