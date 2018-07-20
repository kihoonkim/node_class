var assert = require('assert');

var board = {writer: '김철수', title: 'mocha 테스트', content: '김철수 만세'};
var result = {writer: '김철수', title: 'mocha 테스트', content: '김철수 만세'};


// test shite
describe('#suite-1 동기 방식 테스트', function(){
  // unit test
  it('#1 assert', function(){
    assert(board == result);
  });
  
  it('#2 equal', function(){
    assert.equal(board, result);
  });
  
  it('#3 deepEqual', function(){
    assert.deepEqual(board, result);
  });
})

describe('#suite-2 비동기 방식 테스트', function(){
  it('#1 assert', function(done){
    setTimeout(()=>{
      assert(board == result);
      done();
    }, 1000);
  });
  
  it('#2 equal', function(done){
    setTimeout(()=>{
      assert.equal(board, result);
      done();
    }, 1500);
  });
  
  it('#3 deepEqual', function(done){
    this.timeout(3000);
    setTimeout(()=>{
      assert.deepEqual(board, result);
      done();
    }, 2500);
  });
});

// describe('#suite-3 다른 suite 제외하고 나만 실행', function(){
// describe.only('#suite-3 다른 suite 제외하고 나만 실행', function(){
describe.skip('#suite-3 다른 suite 제외하고 나만 실행', function(){
  it('#1 deepEqual', function(){
    assert.deepEqual(board, result);
  });
});

// 게시판 테스트
var model = require('../models/board');
describe.only('게시판 기능 테스트', function(){
  
  var newNo;
  var boardList;

  before(function(done){
    setTimeout(done, 1500);
  });
  before(function(done){
    model.list(function(list){
      boardList = list;
      done();
    });
  });
  after(function(){
    model.close();
  });

  describe('등록', function() {

    it('등록 요청', function(done){
      model.create(board, (no)=>{
        assert(typeof no == 'number');
        newNo = no;
        done();
      });
    });
    it('등록한 게시물 조회', function(done){
      model.show(newNo, (result)=>{
        assert.deepEqual(result, board);
        done();
      });
    });
  });

  describe('삭제', function() {
    it('삭제 요청', function(done){  
      model.remove(newNo, done);
    });
    it('목록 조회', function(done){
      model.list((result) =>{
        assert.deepEqual(result, boardList);
        done();
      });
    });
  });
});