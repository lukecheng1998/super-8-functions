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
const { signup, login, getAuthenticatedUser } = require("./handlers/users");
//functions from bluetooth.js
const { discoverDevicesOrDisconnect } = require("./handlers/bluetooth")

//Sign up
app.post("/signup", signup);
//Log into the file
app.post("/login", login);
//get user
app.get("/user", FBAuth, getAuthenticatedUser);
//export the url for login
exports.api = functions.https.onRequest(app);
