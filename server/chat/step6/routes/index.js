var url = require('url');
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');

var views = path.join(__dirname, '..', 'views');

function login(req, res, next) {
  var nickname = url.parse(req.url, true).query.username;
  if(nickname && nickname.trim() != '') {
    req.session.nickname = nickname;
    res.writeHead(303, {Location: '/chat'});    
  }
  else {
    res.writeHead(303, {Location: '/'});
  }
  res.end();
}

function logout(req, res, next) {
  req.session.destroy();
  res.writeHead(303, {Location: '/'});
  res.end();
}

function chat(req, res, next) {
  var nickname = req.session.nickname;
  // if(!nickname) {
  //   res.writeHead(303, {Location: '/'});
  //   res.end();
  //   return;
  // }
  var filename = path.join(views, 'chat.ejs');

  ejs.renderFile(filename, {nickname, title: '채팅방'}, (err, data)=>{
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end(data);
  });
  // fs.readFile(filename, (err, data)=> {
  //   res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  //   data = data.toString().replace('<%=nickname%>', nickname);
  //   res.end(data);
  // });
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