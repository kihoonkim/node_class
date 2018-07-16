var http = require('http');
var fs = require('fs');
var h = require('./hellonode');

var server = http.createServer(function(req, res){
  // res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  // res.end('<h1>안녕</h1>');

  var filename = req.url.substring(1);

  // 동기방식
  // try {
  //   var data = fs.readFileSync(filename);
  //   res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  //   res.end(data);  
  // } catch (error) {
  //   res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
  //   res.end('<h1>요청한 파일이 없습니다.</h1>');  
  // }

  fs.readFile(filename, function(err, data){
    if(err) {
      res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
      res.end('<h1>' + h.hello('node') + ' 요청한 파일이 없습니다.!!</h1>');  
    }
    else {
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      res.end(data);  
    }
  });
});

server.listen(1234, function() {
  console.log('HTTP 서버 구동 완료. http://localhost:1234');
});