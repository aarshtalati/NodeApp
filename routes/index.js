var express = require('express');
var router = express.Router();

var _request = require('request');
var _ = require('underscore');


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


        router.get("/", function(request, response) {

          _request({
            url: 'http://www.cartoonnetwork.com/test/backend-quiz/games.json',
            json: true
        }, function(err, json_response, body) {
            if (err) {
                console.log('>>> error getting cartoon network games')
            } else if (json_response.statusCode === 200) {
                games = body;
                console.log('~ games loaded...');
                _request({
                    url: 'http://www.cartoonnetwork.com/test/backend-quiz/shows.json',
                    json: true
                },
                    function(err, json_response, body) {
                        if (err) {
                            console.log('>>> error getting cartoon network shows')
                        } else if (json_response.statusCode === 200) {
                            shows = body;
                            console.log('~ shows loaded...');

                            var a1 = games.games;
                            var a2 = shows.shows;
                            jsons = [a1, a2];
                            var temp = {};

                            // underscore's extend doesn't seem to be recursive
                            _.each(jsons, function(jsonArr) {
                                _.each(jsonArr, function(json) {
                                    temp[json.id] = _.extend({}, temp[json.id], json);
                                });
                            });

                            var games_shows = _.map(a1, function(json) {
                                return temp[json.id];
                            });
                            console.log('~ json arrays combined');
                            console.log(games_shows);
                            //response.send(games_shows);
                            response.render('index', { title: 'Cartoon Network', header : 'Games  + Shows', items : games_shows });
                        }
                    });
                }
                });

        });

module.exports = router;
