require('dotenv').config();
const chalk = require('chalk');

const PORT = Number(process.env.DB_PORT)
const DB_NAME = process.env.DB_NAME


const { MongoClient } = require("mongodb");
// const conUrl = process.env.ATLAS_URI;
const conUrl = `mongodb://localhost:${PORT}/`

console.log(chalk.yellow(`----[connecting to db]---`));
console.log({ PORT, DB_NAME, conUrl })

const client = new MongoClient(conUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbo;
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbo = db.db(DB_NAME);
      console.log(chalk.green("Successfully connected to MongoDB."));

      return callback();
    });
  },

  getDb: function () {
    return dbo;
  },
};
