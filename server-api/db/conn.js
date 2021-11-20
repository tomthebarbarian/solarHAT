const { MongoClient } = require("mongodb");
// const Db = process.env.ATLAS_URI;
let connectionString = `mongodb://localhost:27017/crud`
const dbConn = new MongoClient(connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
);

var _db;

module.exports = {
  connectToServer: function (callback) {
    dbConn.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("solar_flares");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
         });
  },

  getDb: function () {
    return _db;
  },
};


