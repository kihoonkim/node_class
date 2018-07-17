var net = require('net');
var fs = require('fs');
var path = require('path');

var server = net.createServer((socket)=>{
  socket.on('error', (err)=>{
    console.log(err.message);
  });
  socket.on('data', (data)=>{
    var request = data.toString().split('\n')[0].split(' ');
    var req = {};
    req.method = request[0];
    req.url = request[1];
    req.httpVersion = request[2];

    console.log(req);

    fs.readFile(path.join(__dirname, req.url), (err, data)=>{
      if(err) {
        socket.write(req.httpVersion + ' 404 Not found\n');
        socket.write('Content-Type: text/html;charset=utf-8\n');
        socket.write('\n');
        socket.end('<h1>지정한 파일을 찾을수 없습니다.</h1>');
      }
      else {
        socket.write(req.httpVersion + ' 200 OK\n');
        socket.write('Content-Type: text/html;charset=utf-8\n');
        socket.write('\n');
        socket.end(data);
      }
    });
  });
});

server.listen(80, ()=>{
  console.log('listening event로 등록된다.');
});