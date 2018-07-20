var assert = require('assert');

var fail = 0;

var a = 10;
var board = {writer: '김철수', title: '테스트'};
var result = {writer: '김철수', title: '테스트'};

console.log('테스트 시작.');

assert(true);
// assert(false);
assert(a++ == 10);

// 하나라도 테스트가 성공하지 못하면 다음 테스트를 진행하지 않는다.
// 예외 처리 같은 정교한 코드를 직접 작성해야 한다.
try {
  assert.equal(a, 10);
} catch(e) {
  fail++;
  console.log('3번 테스트 실패');
}

assert.equal(a, '11');
assert.deepEqual(board, result);

// 비동기 함수의 테스트가 어렵다.
setTimeout(function(result){
  assert.equal(result, 5);
  console.log('비동기 테스트 통과.');
}, 1000, 6);

if(fail > 0) {
  console.log('테스트 실패 건수: ', fail);
}
else {
  console.log('동기 테스트 통과.');
}