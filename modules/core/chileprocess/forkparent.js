var childProcess = require('child_process');

// node 프로세스를 실행한다.
// spawn()과는 다르게 자식 프로세스와 통신할 수 있는 전용 IPC 채널을 만든다.
var child = childProcess.fork('forkchild.js');
child.send('I am parent.');
child.on('message', data => {
  console.log(data);
});
child.on('exit', code=> {
  console.log('자식 프로세스 종료.', code);
});

// var child = childProcess.spawn('node.exe', ['forkchild.js'], {stdio: 'inherit'});
// child.stdin.write('I am parent.');
// child.stdout.on('data', data=>{});