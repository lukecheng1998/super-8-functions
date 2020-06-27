//Get the firebase admin and allow us to write the functions
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

module.exports = {admin, db};