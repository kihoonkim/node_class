var net = require('net');

// var target = {
//   host: 'localhost',
//   port: 2345
// };
var target = {
  host: 'google.com',
  port: 80
};
var socket = new net.Socket();
socket.connect(target.port, target.host, ()=>{
  console.log('서버 접속 성공.');
  // socket.write('hello');
});

socket.on('error', (err)=>{
  console.log(err.message);
});
socket.on('data', (data)=>{
  console.log(data.toString());
});

process.stdin.on('data', (data)=>{
  socket.write(data, ()=>{
    console.log('데이터 전송 완료');
  });
});