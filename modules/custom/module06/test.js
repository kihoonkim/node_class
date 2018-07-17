var Score = require('./score');

var kim = new Score(100, 100);
var lee = new Score(50, 50);
console.log(kim.sum(), kim.avg());
console.log(lee.sum(), lee.avg());