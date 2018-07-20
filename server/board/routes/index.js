var express = require('express');
var router = express.Router();
var controller = require('../controllers/board');
// var controller = require('../controllers/board_async');

var ensureLogin = require('connect-ensure-login').ensureLoggedIn;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/board');
});

// 목록 조회
router.get('/board', function(req, res, next) {
  controller.list(req, res);
});

// 등록 화면 요청
router.get('/board/new', ensureLogin('/users/login'), function(req, res, next) {
  controller.form(req, res);
});

// 등록 요청
router.post('/board/new', /*ensureLogin('/users/login'),*/ function(req, res, next) {
  controller.create(req, res);
});

// 상세 조회
router.get('/board/:no', function(req, res, next) {
  controller.show(req, res);
});

// 삭제
router.delete('/board/:no', ensureLogin('/users/login'), function(req, res, next) {
  controller.remove(req, res);
});

router.get('/exit', function(){
  process.exit();
});
module.exports = router;
