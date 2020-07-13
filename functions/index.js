const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
const cors = require("cors");
const {db} = require('./util/admin')
app.use(cors());
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//Get the functions from the other file
const { signup, login, getAuthenticatedUser, changeSicknessStatus } = require("./handlers/users");
//functions from bluetooth.js
const { postBluetoothDevice } = require("./handlers/bluetooth")

//TODO: Once a sickness is discovered, we'll need a list to return from
app.post("/bluetooth", FBAuth, postBluetoothDevice)
//Sign up
app.post("/signup", signup);
//Log into the file
app.post("/login", login);
//get user
app.get("/user", FBAuth, getAuthenticatedUser);
//change the sickness status
app.post("/user", FBAuth, changeSicknessStatus);
//export the url
exports.api = functions.https.onRequest(app);
