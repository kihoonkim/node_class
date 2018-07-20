var Browser = require('zombie');
Browser.localhost('localhost:80');

var board = {writer: '좀비', title: '좀비가 등록함.', content: '좀비가 등록한 게시물'};

describe('1. 메인 페이지 접속', function() {
  var browser = new Browser();

  before(function(done){
    browser.visit('/', done);
  });

  it('1-1. 접속 성공 여부 확인', function(){
    browser.assert.success();
  });

  it('1-2. 목록 화면인가?', function(){
    browser.assert.text('header h1', '게시물 목록');
  });
});

describe('2. 게시물 등록', function() {
  var browser = new Browser();

  before(function(done){
    browser.visit('/board/new', done);
  });

  it('2-1. 로그인 화면인가?', function(done){
    if(browser.text('header h1') == '로그인') {
      browser.fill('username', 'kim');
      browser.fill('password', '1234');
      browser.pressButton('button', done);
    } 
    else if(browser.text('header h1') == '글쓰기') {
      done();
    }
  });

  it('2-2. 등록 화면인가?', function(){
    browser.assert.text('header h1', '글쓰기');
  });

  it('2-2. 등록 작업', function(done){
    browser.fill('title', board.title);
    browser.field('content', board.content);
    browser.pressButton('#regist', done);
  });

  it('2-3. 등록 성공?', function(){
    browser.assert.success();
  });

  it('2-4. 등록 결과 화면인가?', function(){
    browser.assert.text('header h1', '등록 결과');
  });
});