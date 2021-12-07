/*
 * All routes for admin are defined here
 * Since this file is loaded in server.js into /,
 *   these routes are mounted onto /
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
//helper functions
const { varInit, authenticateUser, getUserByEmail } = require("../lib/utils");

const bcrypt = require("bcryptjs");
const { ObjectId } = require("bson");

// const admins = require('../lib/adminUsers')
//generate order uuid
// const { v4: uuidv4 } = require('uuid');

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const twilio = {
  account_sid: process.env.TWILIO_ACCOUNT_SID,
  auth_token: process.env.TWILIO_AUTH_TOKEN,
};

//const client = require('twilio')(accountSid, authToken);

//creates new user
const createUser = (name, email, password) => {
  password = bcrypt.hashSync(password, 10);
  user = { name, email, password };
  return user;
};


const findUserByEmail = (email) => {
  const dbConn = dbo.getDb();
  dbConn
    .collection("users")
    .find()
    .toArray(function (err, user) {
      if (err) throw err;
      return (user);
    })
};

//get timestamp and return friendly format
const getTimestamp = (minutes) => {
  let months = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    now = new Date(Date.now() + minutes * 60 * 1000),
    formatted = now.getFullYear() + ' ' + months[now.getMonth() - 1] + ' ' + now.getDate() + ' ' +
      now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') +
      ':' + now.getSeconds().toString().padStart(2, '0');
  return formatted;
};


module.exports = (router, dbo) => {
  //register new user
  router.get("/register", (req, res) => {
    //check if we are already logged in
    const userId = req.session.user_id;

    // if (userId && usersdB[userId]) {
    //   res.redirect('/urls');
    // }
    //initalize template vars
    const templateVars = varInit(false, null, null, null);
    res.render("register", templateVars);
  });

  //T_T
  router.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
      console.log("errCode 400: Invalid user name or password");
      const vars = varInit(false, 400, null, null);
      // res.render("register", vars);
      res.json({ code: 401, exist: false, msg: 'Invalid user name or password!' });

      return;
    }

    const dbConn = dbo.getDb();
    dbConn
      .collection("users")
      .find({ email: email })
      .toArray(function (err, user) {
        if (err) throw err;
        console.log('-xxx----x--reg---')
        console.log({ user, name, email, password });

        //check if user exist
        if (user[0]) {
          //errCode 410: user exist
          console.log("user exists ");
          // const vars = varInit(false, 410, user[0], null);
          // res.render("register", vars);
          res.json({ code: 400, exist: true, msg: 'user already exists' });
          return;
        }


        bcrypt.hash(password, 10, function (err, hash) {
          // Store hash in your password DB.
          console.log('bcrypt register')
          user = { name, email, hash };

          dbConn.collection("users").insertOne(user);


          //create session cookie
          req.session.user_id = user._id;
          console.log("from the register route", user.id)
          console.log("session id from register route", req.session.user_id)
          res
            .status(200)
            .json({ code: 200, exist: false, user });
        });


      });

  });

  router.get("/users", (req, res) => {
    const dbConn = dbo.getDb();
    dbConn
      .collection("users")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        res
          .status(200)
          .json(result);
      });

  });


  router.get("/login", (req, res) => {
    //check if we are already logged in
    const userId = req.session.user_id;
    console.log("login:", userId);

    const dbConn = dbo.getDb();

    dbConn
      .collection("users")
      .find(ObjectId(userId))
      .toArray((err, user) => {
        if (err) throw err;
        if (user[0]) {
          res.json({ code: 200, msg: 'success', user })
          // res.redirect("/sites");
          return
        }
        //initialize template variable,
        //if we are here we are not logged in
        const templateVars = varInit(false, null, null, null);
        // res.render("login", templateVars);

        console.log('------------------session-------')
        res.json({ code: 401, msg: 'user not found', user: null })

      });
  });

  router.post("/login", (req, res) => {
    //parse user email and password
    const { email, password } = req.body;
    console.log({ email, password });
    if (!email && !password) {
      console.log("errCode 400: Invalid user name or password");
      const vars = varInit(false, 400, null, null);
      // res.render("register", vars);
      res.json({ code: 400, exist: false, msg: 'Invalid user name or password!' });

      return;
    }
    const dbConn = dbo.getDb();
    dbConn
      .collection("users")
      .find({ email: email })
      .toArray((err, user) => {
        if (err) throw err;
        user = user[0];
        if (!user) {
          res.json({ code: 401, msg: 'user not found', user: null })
          return
        }

        bcrypt.compare(password, user.hash, function (err, auth) {
          // result == true

          console.log({ auth });
          if (!auth) {
            //authentication failed -
            //redirect to login with appropriate error message
            const vars = varInit(false, 410, null, null);
            // res.render("login", vars);
            res
              .json({ code: 403, msg: 'invalid password', user: null })
            return;
          }

          req.session.user_id = user._id;
          console.log(`------------[user.id]--------------\n`, user._id);

          const vars = varInit(true, 200, user, null);
          // res.render('main', vars);
          res
            .json({ code: 200, msg: 'success', user })
          return;
        });
      });


  });

  router.get("/logout", (req, res) => {
    //clears cookie and redirect to login page
    req.session = null;
    const state = varInit(false, 200, null, null);
    // res.render("login", vars);
    res.json({ code: 200, msg: 'logged out', user: null })

  });

  return router;
};
