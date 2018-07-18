/**
 * 웹서버 개발시 해야 할 일들
 * 
 * 1. 로깅
 * 2. POST 방식의 body 파싱
 * 3. url 텍스트 인코딩
 * 4. JSON 형태의 데이터 파싱
 * 5. 쿠키 파싱
 * 6. 세션 처리(로그인 상태 유지)
 * 7. 정적인 자원 응답
 * 8. 동적인 자원 응답
 * 9. 파일 업로드
 * 10. DB 핸들링
 * 11. 보안 (권한, 인증)
 * 12. 에러 처리
 * ....
 * 각각의 기능을 독립적인 함수로 작성 (미들웨어)
 * connect 모듈을 사용
 *  - 미들웨어를 관리하는 컨테이너
 *  - 미들웨어를 제공하지는 않음
 */
var path = require('path');
var logger = require('./middleware/logger')({type: 'file', path: 'log_chat.txt'});
var static = require('./middleware/static')(path.join(__dirname, 'public'));

var app = (req, res)=> {
  static(req, res);
  logger(req, res);
};

module.exports = app;