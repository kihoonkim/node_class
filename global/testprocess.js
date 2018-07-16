console.log('1. process 시작');

// console.log(process.cwd());
// console.log(process.argv);

process.on('exit', (code)=>{
  console.log('process 종료 직전에 처리할 작업', code);

  setTimeout(()=>{
    console.log('exit 이벤트 내으 비동기 함수는 호출되지 않는다. 동기로 처리해야 한다. ex) fs.writeFileSync()');
  }, 2000);
});

try {
  a();
} catch (err) {
  console.error(err.message);
}

setTimeout(()=>{
  console.log('강제 종료 후에는 비동기 함수 실행되지 않음');
}, 1500);

setTimeout(()=>{
  console.log('등록된 비동기 함수가 실행된 후에 종료 됨');
  process.exit(3);
}, 1000);

console.log('2. process 종료');
