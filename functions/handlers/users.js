const { admin, db } = require("../util/admin");
const firebase = require("firebase");
const config = require("../util/config");
firebase.initializeApp(config);
//file for authenticating users and getting user details
const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
} = require("../util/validators");
exports.signup = (req, res) => {
  //New user to go into the database
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };
  //Check and make sure all the contents are valid
  const { valid, errors } = validateSignupData(newUser);
  if (!valid) {
    return res.status(400).json(errors);
  }
  //Check for any redundancy
  let token, userId;
  db.doc(`/users/${newUser.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ email: "email is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    //make the new user, sign them in and store to the database
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.email}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email already in use" });
      } else {
        return res
          .status(400)
          .json({ general: "Something went wrong, please try again" });
      }
    });
};

//login a user
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const { valid, errors } = validateLoginData(user);
  //Check for errors in validate login data
  if (!valid) {
    return res.status(400).json(errors);
  }
  //no errors, login
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      //If successful get the id token
      return data.user.getIdToken();
    }) //return the id token to the console
    .then((token) => {
      return res.json({ token });
    }) //catch any errors if anything is incorrect
    .catch((err) => {
      console.log(err);
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again" });
    });
};
