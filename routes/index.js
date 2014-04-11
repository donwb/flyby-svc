var express = require('express');
var router = express.Router();
var mongo = require('mongoskin');

var dbstring = 'mongodb://flybyuser:flyby1234@ds039737.mongolab.com:39737/flyby';

/* GET home page. */
router.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});

router.get('/in/:user', function(req, res) {
	console.log('in');
	var username = req.params.user;
	console.log('Setting ' + username + ' to in');
	
	var db = mongo.db(dbstring, {native_parser: true});
	db.bind('flyby');

	db.flyby.update(
		{ user: username},
		{ 
			$set: { status : "in"}
		},
		{upsert: false},
		function done() {
			console.log('done');
			res.send({"status" : "Ok"});
		}
	);

});

router.get('/out/:user', function(req, res){
	console.log('out');
	var username = req.params.user;
	console.log('changing status for: ' + username);

	var db = mongo.db(dbstring, {native_parser: true});
	db.bind('flyby');

	db.flyby.update(
		{ user: username},
		{ 
			$set: { status : "out"}
		},
		{upsert: false},
		function done() {
			console.log('done');
			res.send({"status" : "Ok"});
		}
	);


});

router.get('/status/:user', function(req, res) {
	var username = req.params.user;
	console.log('Looking for: ' + username);

	var db = mongo.db(dbstring, {native_parser: true});
	db.bind('flyby');

	db.flyby.find({"user": username}).toArray(function(err, items){
		if(items.length === 0) {
			res.send({"user" : "user not found"});
		} else {
			res.send({user: items[0]});
		}

		db.close();
	});

});

module.exports = router;

