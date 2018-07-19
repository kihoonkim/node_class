var path = require('path');
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var model = require('./models/board');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// delete 방식의 요청으로 변환
app.use((req, res, next) => {
  if(typeof req.body === 'object' && '_method' in req.body) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
});

app.use(session({
  cookie: {maxAge: 1000*60*60},
  secret: 'secret text',
  rolling: true // 매 응답마다 쿠키 만료시간 초기화
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy((username, password, cb)=>{
  model.login(username, password, (err, user) => {
    if(err) {
      cb(err);
    } else if(!user) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  });
}));

// 로그인 성공시 세션에 사용자 정보를 저장
passport.serializeUser((user, cb)=>{
  cb(null, user._id);
});

// 세션에서 사용자 정보를 추출해서 req.user에 저장
passport.deserializeUser((id, cb) => {
  model.findUser(id, cb);
});

app.use((req, res, next) => {
  console.log('req.user', req.user);
  console.log('req.session', req.session);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: '에러 페이지'});
});

module.exports = app;
