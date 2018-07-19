var model = require('../models/board');

module.exports.form = (req, res) => {
  res.render('login', {title: '로그인'});
};