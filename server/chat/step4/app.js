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
var connect = require('connect');

var path = require('path');
var logger = require('./middleware/logger');
var static = require('./middleware/static');

var app = connect();

// 미들웨어 등록
app.use(logger({type: 'file', path: 'log_chat.txt'}));
app.use(static(path.join(__dirname, 'public')));
// 404 에러 처리 미들웨어
app.use((req, res, next)=> {
  res.writeHead(404,{'Content-Type': 'text/html;charset=utf-8'});
  res.end(`<h1>${req.url} 지정한 파일을 찾을수 없습니다.</h1>`);
});

module.exports = app;