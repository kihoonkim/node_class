console.log('m2는 Function을 exports 하는 모듈');

function fn(name, age) {
  return {name, age};
}
module.exports = fn;