

//authenticate user
const authenticateUser = (email, password, user) => {
  let authStatus = {};
  if (user) {

    if (password === user.password) {
      err = 200; //user
      errMsg = 'Hello, ' + user.name;

    } else {
      err = 401;
      errMsg = 'Invalid password! Try again';
    }
  } else if (!user && email.length > 0) {
    err = 400;
    errMsg = 'Error user not found!';
  } else {
    err = 402;
    errMsg = 'Invalid user name or password!';
  }

  authStatus.num = err;
  authStatus.errMsg = "❌ Error " + err + '\n' + errMsg;
  return authStatus;
};


//initalize template variable passed to ejs view
const varInit = (loggedIn, errCode, user, items) => {
  const templateVars = { loggedIn, errCode, user, items };
  return templateVars;
};

//find user in a database by email
const getUserByEmail = (email, users) => {

  for (let userId in users) {
    const user = users[userId];
    if (email === user.email) {
      console.log(user);
      return user;
    }
  }
  return false;
};


module.exports = { varInit, authenticateUser, getUserByEmail };
