const admin = require("firebase-admin");

const serviceAccount = require("./evallo-task-firebase-adminsdk-l5rar-874f5d3995.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "evallo-task.appspot.com", // Replace with your Firebase Storage bucket URL
});

const storage = admin.storage();

module.exports = storage;
