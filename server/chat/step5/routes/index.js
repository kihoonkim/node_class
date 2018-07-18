var url = require('url');
var path = require('path');
var fs = require('fs');

var views = path.join(__dirname, '..', 'views');

function login(req, res, next) {
  var nickname = url.parse(req.url, true).query.username;
  if(nickname && nickname.trim() != '') {
    res.writeHead(303, {Location: '/chat'});    
  }
  else {
    res.writeHead(303, {Location: '/'});
  }
  res.end();
}

function logout(req, res, next) {
  res.writeHead(303, {Location: '/'});
  res.end();
}

function chat(req, res, next) {
  // res.writeHead(303, {Location: '/chat.html'});
  // res.end();
  var nickname = url.parse(req.url, true).query.username;
  var filename = path.join(views, 'chat.html');

  fs.readFile(filename, (err, data)=> {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    data = data.toString().replace('<%=nickname%>', nickname);
    res.end(data);
  });
}

var router = function(req, res, next) {
  var pathName = url.parse(req.url).pathname;
  switch(pathName) {
    case '/login':
      login(req, res, next);
      break;
    case '/logout':
      logout(req, res, next);
      break;
    case '/chat':
      chat(req, res, next);
      break;
    default:
      next();
  }
};

module.exports = router;