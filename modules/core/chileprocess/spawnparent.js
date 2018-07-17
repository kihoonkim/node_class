var childProcess = require('child_process');

// 지정한 프로세스 실행
// childProcess.spawn('calc.exe');
// childProcess.spawn('notepad.exe');

// spawn(command, [args], options)
var child = childProcess.spawn('node.exe', ['spawnchild.js'], {
  // stdio: 'inherit' // 부모꺼 상속해서 사용 -> stdio: ['inherit', 'inherit', 'inherit']
  // stdio: 'ignore'  // 무시
  stdio: 'pipe' // 자식 프로세스의 표준 입출력 장치를 생성된 child process 객체의 stdin, stdout, stderr 속성에 pipe연결 
});

// 1. parent -> child
child.stdin.write('hello');

child.stdout.on('data', data => {
  //3.
  console.log('부모 콘솔 ', data.toString())
});


var childCmd = childProcess.spawn('cmd.exe');
childCmd.stdin.write('dir\n');
childCmd.stdout.on('data', data=>{
  console.log(data.toString());
});