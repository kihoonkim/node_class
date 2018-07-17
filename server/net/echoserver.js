var file = require('fs').createWriteStream('output.txt', {flags: 'a'});

require('net').createServer((socket)=>{
  socket.on('error', ()=>{});
  socket.pipe(socket);
  socket.pipe(file);
}).listen(3456);