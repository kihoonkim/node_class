var fs = require('fs');
var path = require('path');
var url = require('url');
var mimeTypes = require('mime');

var staticServer = (req, res, next) => {
  if(req.url === '/') {
    req.url = 'index.html';
  }

  var parseUrl = url.parse(req.url);
  var filename = path.join(base, parseUrl.pathname);
  var extname = path.extname(filename).substring(1);

  fs.stat(filename, (err, status)=>{
    if(err) {
      next();
    } else if(status.isFile()) {
      res.writeHead(200, {'Content-Type': mimeTypes.getType(extname) + ';charset=utf-8'});

      var filestream = fs.createReadStream(filename);
      filestream.pipe(res);
    } else {
      res.writeHead(403, {'Content-Type': mimeTypes.getType(extname) + ';charset=utf-8'});
      res.end(`<h1>${req.url} directory access is forbidden.</h1>`);
    }
  });
};

var base;
function setBase(dir) {
  base = dir;
  return staticServer;
}

module.exports = setBase;