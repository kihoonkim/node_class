var model = require('../models/board_async');
// var model = require('../models/board_mysql');

module.exports.list = async (req, res) => {
  // await 는 async로 선언된 함수 내에서 Promise 객체에만 붙일 수 있다.
  var list = await model.list();      
  res.render('board/list', { title: '게시물 목록', list });
};

module.exports.form = (req, res) => {
  res.render('board/write', { title: '글쓰기' });
};

module.exports.create = async (req, res) => {
  var board = req.body;

  board.writer = req.user.name;

  var no = await model.create(board);
  
  res.render('board/result', { title: '등록 결과', no });
};

module.exports.show = async (req, res) => {
  var board = await model.show(parseInt(req.params.no));
  res.render('board/view', { title: '내용 조회', board: board.value });
};

module.exports.remove = async (req, res) => {
  await model.remove(parseInt(req.params.no));
  res.redirect('/');
};