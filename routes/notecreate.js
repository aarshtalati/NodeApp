var express = require('express');
var router = express.Router();

var request = require("request");

var data = require('../MongoDbService');

router.get('/', function(req, res, next) {

  data.getNotes(function(err, notebooks) {
    res.render('notecreate', {
      title: 'Create',
      notebooks: notebooks
    });
  });
});

router.post('/', function(req, res, next) {

  var noteToInsert = {
    note: req.body.name,
    author: req.body.author,
    color: req.body.color
  };

  data.addNoteToNoteBook(req.body.notebook, noteToInsert, function(err) {
    if (err) {
      console.log(err);
      response.send(400, 'Error inserting note in the database');
    } else {
      console.log('note added to database');
      // response.set('Content-Type', 'application/json');
      // response.send(201, noteToInsert);
      data.getNotes(function(err, allNotes) {
        console.log('notebooks loaded from server');
        res.render('notelist', {
          title: 'Notes (MongoDB)',
          error: err,
          notebooks: allNotes
        });
      });
    }
  });

});
module.exports = router;
