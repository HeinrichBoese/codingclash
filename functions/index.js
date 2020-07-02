const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.collectGarbage = functions.pubsub
  .schedule("every 5 minutes")
  .onRun((context) => {
    const date = new Date();
    date.setHours(date.getHours() - 1);
    db.collection("gamesessions")
      .where("creationTime", "<", admin.firestore.Timestamp.fromDate(date))
      .get()
      .then((snapshot) => snapshot.forEach((doc) => doc.ref.delete()))
      .catch((err) => console.log(err));
    return null;
  });

exports.getRandomChallengeID = functions
  .region("europe-west3")
  .https.onCall(async (data, context) => {
    try {
      const documentRefs = await db.collection("challenges").listDocuments();
      const randIndex = Math.floor(Math.random() * documentRefs.length);
      const randDocumentRef = documentRefs[randIndex];
      const document = await randDocumentRef.get();
      return document.id;
    } catch (err) {
      console.log(err.code);
      throw new functions.https.HttpsError(err.code, err.message);
    }
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// FunKtion um Anonyme User zu löschen.
// function deleteAnonymousUsers(nextPageToken) {
//     adminApp
//        .auth()
//        .listUsers(20, nextPageToken)
//        .then(function(listUsersResult) {
//          listUsersResult.users.forEach(function(userRecord) {
//            // updated condition from = 0 to === 0
//            if (userRecord.providerData.length === 0) { //this user is anonymous
//             console.log(userRecord); // do your delete here
//             adminApp.auth().deleteUser(userRecord.uid)
//                .then(function() {
//                    console.log("Successfully deleted user");
//                })
//                .catch(function(error) {
//                    console.log("Error deleting user:", error);
//                });
//            }
//          });
//          if (listUsersResult.pageToken) {
//            // List next batch of users.
//            deleteAnonymousUsers(listUsersResult.pageToken);
//          }
//        })
//        .catch(function(error) {
//          console.log('Error listing users:', error);
//        });
//    }
