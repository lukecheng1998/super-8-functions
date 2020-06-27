const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
//Get the FBAuth
const cors = require('cors');
app.use(cors());
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
<<<<<<< HEAD
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const {
    signup
} = require("./handlers/users");
app.post('/signup', signup)
exports.api = functions.https.onRequest(app);
=======
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
>>>>>>> bff7ee8be80a5ab59405cce55f32e19e0b493d70
