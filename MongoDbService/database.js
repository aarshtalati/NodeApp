(function(database) {
	var mongodb = require("mongodb");
	var mongoUrl = "mongodb://localhost:27017/cn";

	var NodeAppDB = null;

	database.getDb = function(next) {
		if (!NodeAppDB) {
			//connect to the database
			mongodb.MongoClient.connect(mongoUrl, function(err, db) {
				if (err) {
					next(err, null);
				} else {
					NodeAppDB = {
						db: db,
						notes: db.collection('notes')
					};
					next(null, NodeAppDB);
				}
			});
		} else {
			next(null, NodeAppDB);
		}
	};
})(module.exports);
