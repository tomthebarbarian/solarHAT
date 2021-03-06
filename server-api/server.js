//helper functions
const { varInit,
  authenticateUser,
  getUserByEmail } = require('./lib/utils');


// load .env data into process.env
require("dotenv").config();
const axios = require('axios')


const { MongoClient } = require('mongodb')


const cors = require('cors')

// if for whatever reason 8000 is taken by another process
// change PORT in .env file
const PORT = process.env.PORT || 8000;

const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");


//dependency
const chalk = require('chalk');

const morgan = require("morgan");
const session = require("cookie-session");
app.use(session({
  name: 'session', keys: ['test'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(cors())

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cookieSession = require('cookie-session');

app.set('view engine', 'ejs');

// mongoDB database client/connection setup
const dbName = process.env.DB_NAME

const dbo = require('./db/conn')

dbo.connectToServer(function (err) {
  if (err) console.error(chalk.red(err));
})

// Separated Routes for each Resource
const sitesRoutes = require("./routes/sitesRoutes");
const userRoutes = require("./routes/userRoutes");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use('/', userRoutes(router, dbo));
app.use("/api/", sitesRoutes(router, dbo));


// normally routes will go in route files defined above
// this is for quick testing and prototyping
app.get("/", (req, res) => {
  console.log("WE ARE IN THE SERVER");
  //dummy data for now
  //need to integrate mongo dB
  const vars = varInit(false, null, null, null)
  res.render('login', vars)
});


//api call to fetch data and returns a promise
const fetchData = (latlong) => {

  // https://apps.solargis.com/api/data/lta?loc=-78.486328,45.089036
  const lat = latlong.lat
  const lon = latlong.lng
  return Promise
    .all([
      axios.get(`https://apps.solargis.com/api/data/lta?loc=${lat},${lon}`)
    ])
    .then(res => {
      console.log(`--------[lat, long]---------\n ${lat},${lon}`);

      return res[0].data;
    })
    .catch(error => console.log(`Error: ${error}`));
};



const getSolarForLatLon = () => {
  const lat = 45.513809
  const lon = -73.5625
  return axios.get(`https://apps.solargis.com/api/data/lta?loc=${lat},${lon}`)
    .then((result) => {
      console.log('--------[promise]---------', result);
      return result
    })
}


app.get("/fetch", (req, res) => {
  console.log("from client", req.body)
  const latlong = req.body

  fetchData(latlong)
    .then(result => {
      console.log('-----------[axios call]---------\n', Object.keys(result))
      console.log('-----------[axios call]---------\n', result['annual'].data)
      res.json(result['annual'].data)

    })
    .catch(err => console.log(err.message))

})

app.post('/pv_data', (req, res) => {
  console.log("from client", req.body)
  const latlong = req.body

  fetchData(latlong)
    .then(result => {
      console.log('-----------[axios call]---------\n', Object.keys(result))
      console.log('-----------[axios call]---------\n', result['annual'].data)
      res.json(result['annual'].data)

    })
    .catch(err => console.log(err.message))

})



app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`)
})






