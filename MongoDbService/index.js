(function(data) {

  var seedData = require('./seedData');
  var database = require('./database')

  //data.getNoteCategories = function (next) {
  //    next(null, seedData.initialNotes)
  //};

  data.getNotes = function(next) {
    database.getDb(function(err, db) {
      if (err) {
        console.log('error getting notes from database');
      } else {
        db.notes.find().toArray(function(err, results) {
          if (err) {
            next(err, null);
          } else {
            next(null, results);
          }
        });
      }
    });
  };

  data.getNotesByCategoryName = function(categoryName, next) {
    database.getDb(function(err, db) {
      if (err) {
        next(err, null)
      } else {
        db.notes.findOne({
          name: categoryName
        }, next)
      }
    });
  };

  data.addNoteToNoteBook = function(notebookName, noteToInsert, next) {
    console.log('inside add notebook');
    database.getDb(function(err, db) {
      if (err) {
        console.log('error occured', err);
        next(err, null)
      } else {
        console.log(
          'connected to database, now saving a note to datbase');
        db.notes.update({
          name: notebookName
        }, {
          $push: {
            notes: noteToInsert
          }
        }, next);
      }
    });
  };

  function seedDatabase() {
    database.getDb(function(err, db) {
      if (err) {
        console.log('failed to connect to database : ', err);
      } else {
        // check if document records already exist
        db.notes.count(function(err, count) {
          if (err) {
            console.log("failed to retrieve database count !");
          } else if (count == 0) {
            console.log('seeding the database !');
            seedData.initialNotes.forEach(function(item) {
              console.log('inserting : ', item.name)
              db.notes.insert(item, function(err) {
                if (err) {
                  console.log('insert failed', item);
                }
              });
            });
            console.log('<<<< Seed complete.')
          } else {
            console.log(
              'database has already been seeded, or at-least one note was found !'
            );
          }
        });
      }
    });
  }

  seedDatabase();

})(module.exports);
