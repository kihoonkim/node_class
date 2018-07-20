var dateFormat = require('date-format');
var MongoClient = require('mongodb').MongoClient;

var client;
var db;

MongoClient.connect('mongodb://localhost:27017')
					.then(result => {
						client = result;
						db = client.db('boardDB');
						db.board = db.collection('board');
						db.user = db.collection('user');
						db.seq = db.collection('seq');
						
						console.log("DB 접속 완료");
					});
	


// MongoClient.connect('mongodb://localhost:27017', (err, result)=>{	
// 	client = result;
// 	db = client.db('boardDB');
// 	db.board = db.collection('board');
// 	db.user = db.collection('user');
// 	db.seq = db.collection('seq');

// 	console.log("DB 접속 완료");
// });

module.exports = {
	list: function(){
		return db.board.find({}, {content: 0}).sort({_id: -1}).toArray();
	},
	show: function(no){
		// ECMA6 Promise
		/*return new Promise((resolve, reject)=>{
			db.board.findOneAndUpdate({_id: no}, {$inc: {view: 1}}, (err, result)=>{
				if(err) {
					reject(err)
				} else {
					resolve(result.value);
				}
			});
		});*/
		return db.board.findOneAndUpdate({_id: no}, {$inc: {view: 1}});
	},
	create: async function(board){
		board.view = 0;
		board.regdate = dateFormat.asString('yyyy-MM-dd hh:mm', new Date());
		
		var result = await db.seq.findOneAndUpdate({}, {$inc: {seq: 1}});
		board._id = result.value.seq;
		
		await db.board.insert(board);
		return board._id;
	},
	remove: function(no){
		return db.board.remove({_id: no});
	},
	login: function(id, pw, cb) {
		db.user.findOne({_id: id, password: pw}, {name: 1}, cb);
	},
	findUser: function(id, cb) {
		db.user.findOne({_id: id}, {name: 1}, cb);
	}
};
