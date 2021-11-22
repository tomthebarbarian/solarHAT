require('dotenv').config();
const chalk = require('chalk');

const port = process.env.DB_PORT
const db_name = process.env.DB_NAME

const path = require('path');
const { Seeder } = require('mongo-seeding');

const dbConn = {
  database: {
    host: '127.0.0.1',
    port: Number(port) || 27017,
    name: db_name,
  },
  dropDatabase: true,
};

console.log(chalk.yellow(`----[connecting to db]---`));

console.log(dbConn.database)
console.log(chalk.yellow(`---[loading seed files]---`));

// return
const seeder = new Seeder(dbConn);
const collections = seeder.readCollectionsFromPath(
  path.resolve('./db/seed'),
  {
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
  },
);


seeder
  .import(collections)
  .then(() => {
    console.log(chalk.green(`--------> Success!`));

  })
  .catch(err => {
    console.log(chalk.red('Error', err));
  });

