const functions = require('firebase-functions');

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