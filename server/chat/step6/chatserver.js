function chat(io) {
  io.on('connection', socket=>{
    socket.on('disconnect', ()=>{
      io.emit('chat', `시스템: ${socket.nickname} 님이 나갔습니다.`);
    });
    
    socket.on('login', (nickname)=>{
      socket.nickname = nickname || 'guest';
      io.emit('chat', `시스템: ${socket.nickname} 님이 입장했습니다.`);
    });

    socket.on('chat', msg=>{
      io.emit('chat', `${socket.nickname}: ${msg}`);
    });
  });
}

module.exports = chat;