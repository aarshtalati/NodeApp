var express = require('express');
var router = express.Router();

var data = require('../MongoDbService');

router.get('/', function(req, res, next) {
  res.render('notefind', {
    title: 'Find',
    searchResults: []
  });
});

router.post('/', function(req, res, next) {

  data.getNotesByCategoryName(req.body.name, function(err, notebook) {
    if (err) {
      console.log(err);
      response.send(400, 'Error searching a notebook in the database');
    } else if (notebook) {
      console.log(
        'query to find notebook indatabase executed successfully');
      res.render('notefind', {
        title: 'Search Results',
        searchResults: [notebook]
      });
    } else {
      res.render('notefind', {
        title: 'Nothing Found',
        searchResults: []
      });
    }
  });

});

module.exports = router;
