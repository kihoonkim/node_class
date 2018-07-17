var net = require('net');

var server = net.createServer((socket)=>{
  console.log('클라이언트 접속', socket.remoteAddress);

  socket.on('error', (err)=>{
    console.log(err.message);
  });

  socket.on('data', (data)=>{
    console.log(data.toString());
    // socket.write('반송: ' + data)
  });
});

server.listen(2345, ()=>{
  console.log('listening event로 등록된다.');
});

// server.listen(2345);
// server.on('listening', ()=>{
//   console.log('TCP server 구동 완료.');
// });