var express = require('express');
var router = express.Router();
var controller = require('../controllers/user');
var passport = require('passport');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  controller.form(req, res);
});

router.post('/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/users/login'
}));

module.exports = router;
