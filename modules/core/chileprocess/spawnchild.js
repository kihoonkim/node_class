var path = require('path');

var filename = path.basename(__filename);

console.log(filename, '실행');

process.stdin.on('data', data=> {
  // 2. child -> parent
  process.stdout.write(data);
});