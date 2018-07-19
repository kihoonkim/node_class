var model = require('../models/board');
// var model = require('../models/board_mysql');

module.exports.list = (req, res) => {
  model.list( list => {
    res.render('board/list', { title: '게시물 목록', list });
  });
};

module.exports.form = (req, res) => {
  res.render('board/write', { title: '글쓰기' });
};

module.exports.create = (req, res) => {
  var board = req.body;

  board.writer = req.user.name;
  model.create(board, no => {
    res.render('board/result', { title: '등록 결과', no });
  });  
};

module.exports.show = (req, res) => {
  var no = parseInt(req.params.no);

  model.show(no, board => {
    res.render('board/view', { title: '내용 조회', board });
  })
};

module.exports.remove = (req, res) => {
  var no = parseInt(req.params.no);

  model.remove(no, ()=>{
    res.redirect('/');
  });
};