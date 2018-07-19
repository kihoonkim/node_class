// 현재 DB 삭제
db.runCommand({dropDatabase: 1});

// 등록할 게시물
var b1 = {
		_id: 1,
		title: '첫번째 게시물',
		writer: 'kim',
		content: '첫번째 게시물 입니다.',
		view: 0,
		regdate: '2017-06-20 12:34'
};
var b2 = {
		_id: 2,
		title: '두번째 게시물',
		writer: 'lee',
		content: '두번째 게시물 입니다.',
		view: 0,
		regdate: '2017-06-21 12:54'
};

// 게시물 등록(collection.insert(document))
// db.board.insert(b1);
// db.board.insert(b2);
db.board.insert([b1, b2]);

// 게시물 목록 조회
// collection.find({검색조건}, {출력속성})).sort({정렬옵션}).limit(개수)
db.board.find({_id: 2});
db.board.find({writer: '김철수'});
db.board.find({writer: '김철수'});
db.board.find({_id: 1, writer: '김철수'});

db.board.find({_id: 1}, {writer:1, title:1});
db.board.find({_id: 1}, {_id:0, writer:1, title:1});
db.board.find({}, {_id:0, writer:1, title:1});

db.board.find().sort({_id: -1});	// 1: 오름차순, -1: 내림차순
db.board.find().sort({_id: -1}).limit(1);

// 모든 게시물을 _id의 내림차순으로 조회
// (출력 컬럼은 번호, 제목, 글쓴이, 조회수, 작성일)
db.board.find({}, {_id:1, title:1, writer:1, view:1, regdat:1}).sort({_id: -1});

// 게시물 한건 조회(collection.findOne({검색조건}, {출력속성}))
db.board.findOne({_id: 2}, {title:1, writer:1});

// 게시물 수정(collection.update({검색조건}, {수정할문서}))
db.board.update({_id: 2}, {title: 'hello'});
db.board.update({_id: 1}, {$set: {title: '안녕'}});
db.board.update({_id: 1}, {$inc: {view: 1}});

// 게시물 한건 조회 및 업데이트(collection.findOneAndUpdate({검색조건}, {수정할문서}))
var board1 = db.board.findOneAndUpdate({_id: 1}, {$inc: {view: 1}});

// 게시물 삭제(collection.remove({검색조건}))
db.board.remove({_id: 2});

// sequence용 데이터 추가
db.seq.insert({seq: 1});

// sequence 조회 및 업데이트
var no = db.seq.findOneAndUpdate({}, {$inc: {seq: 1}});

// board DB 초기화
use boardDB;
db.runCommand({dropDatabase: 1});
db.board.insert([b1, b2]);
db.seq.insert({seq: 3});

db.user.insert({
	_id: 'kim',
	password: '1234',
	name: '김철수'
});

db.user.insert({
	_id: 'lee',
	password: '1234',
	name: '이영희'
});