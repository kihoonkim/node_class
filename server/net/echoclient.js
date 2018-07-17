var socket = new require('net').Socket();

process.stdin.pipe(socket).pipe(process.stdout);

socket.on('error', (err)=>{console.log(err)});
socket.connect(3456, 'localhost');