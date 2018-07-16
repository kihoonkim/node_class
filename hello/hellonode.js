function hello(name) {
  return 'Hello' + name;
}
console.log(hello('node'));

module.exports.hello = hello;