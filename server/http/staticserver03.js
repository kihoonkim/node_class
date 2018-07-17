var http = require('http');
var nodeStatic = require('node-static');

var file = new nodeStatic.Server();
http.createServer((req, res)=>{
  file.serve(req, res);
}).listen(80);