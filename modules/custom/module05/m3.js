console.log('m3는 객체를 인자로 받는 모듈.');

function score(user) {
  return {
    sum: function(){
      return user.kor + user.eng;
    },
    avg: function(){
      return this.sum() / 2;
    }
  };
}

module.exports = score;