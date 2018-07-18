var childProcess = require('child_process');

// spawn()으로 쉘을 생성한 후 쉘에 command를 전달한다.
// 자식프로세스의 출력이 완료되면 콜백 함수가 호출됨
// exec(command, [options], [callback])
childProcess.exec('dir', (err, stdout, stderr) => {
  if(err) {
    console.log(err);
  }
  else {
    console.log(stdout);
  }
});

// 쉘을 생성하지는 않고 지정한 파일을 실행한다.
childProcess.execFile('calc.exe');