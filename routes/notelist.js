var express = require('express');
var router = express.Router();

var data = require('../MongoDbService');

router.get('/', function(req, res, next) {
	data.getNotes(function(err, allNotes) {
		console.log('notebooks loaded from server');
		console.log(allNotes);
		res.render('notelist', {
			title: 'Notes (MongoDB)',
			error: err,
			notebooks: allNotes
		});
	});
});

module.exports = router;
