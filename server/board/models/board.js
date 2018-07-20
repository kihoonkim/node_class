var dateFormat = require('date-format');
var MongoClient = require('mongodb').MongoClient;

var client;
var db;

MongoClient.connect('mongodb://localhost:27017', {poolSize: 10}, (err, result)=>{	
	client = result;
	db = client.db('boardDB');
	db.board = db.collection('board');
	db.user = db.collection('user');
	db.seq = db.collection('seq');

	console.log("DB 접속 완료");
});

/*
var b1 = {
		_id: 1,
		title: '첫번째 게시물',
		writer: '김철수',
		content: '첫번째 게시물 입니다.',
		view: 0,
		regdate: '2019-06-20 12:34'
};
var b2 = {
		_id: 2,
		title: '두번째 게시물',
		writer: '이영희',
		content: '두번째 게시물 입니다.',
		view: 0,
		regdate: '2019-06-21 12:54'
};
var boardList = [b1, b2];
*/

module.exports = {
	list: function(cb, page){
		page = page || 1;
		db.board.find({}, {content: 0})
						.sort({_id: -1})
						.skip((page-1)*10)	// paging
						.limit(10)
						.toArray((err, result)=> {
							cb(result);
						});
	},
	show: function(no, cb){
		db.board.findOneAndUpdate({_id: no}, {$inc: {view: 1}}, (err, result)=> {
			console.log(result);
			cb(result.value);
		});
	},
	create: function(board, cb){
		board.view = 0;
		board.regdate = dateFormat.asString('yyyy-MM-dd hh:mm', new Date());

		db.seq.findOneAndUpdate({}, {$inc: {seq: 1}}, (err, result)=>{
			board._id = result.value.seq;
			
			db.board.insert(board, ()=>{
				cb(board._id);
			});
		});
	},
	remove: function(no, cb){
		db.board.remove({_id: no}, cb);
	},
	login: function(id, pw, cb) {
		db.user.findOne({_id: id, password: pw}, {name: 1}, cb);
	},
	findUser: function(id, cb) {
		db.user.findOne({_id: id}, {name: 1}, cb);
	},
	close: function(){
		client.close();
	}
};
