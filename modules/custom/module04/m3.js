console.log('m3 로딩됨');
console.log(__dirname);
console.log(__filename);

var m2 = require('./m2');
// console.log(require.cache);
console.log(require.main === module);
console.log(require.main.filename);
console.log(module.filename);
console.log(module.parent);
console.log(module.children);
