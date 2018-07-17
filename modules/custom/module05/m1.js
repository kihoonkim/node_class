console.log('m1은 Object를 exports 하는 모듈');

// module.exports = {
//   name: 'm1',
//   type: 'object'
// };
// module.exports.name = 'm1';
// module.exports.type = 'object';

// 불가능
// exports = {
//   name: 'm1',
//   type: 'object'
// };

// 가능
exports.name = 'm1';
exports.type = 'object';