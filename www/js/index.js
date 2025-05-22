/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready


document.addEventListener('deviceready', function () {
  // Optional: Grant permission for iOS
  window.FirebasePlugin.grantPermission();

  // Get the FCM token
  window.FirebasePlugin.getToken(function (token) {
    console.log("FCM Token: " + token);
    // Save this token to your backend to target this device
  }, function (error) {
    console.error("Error getting token", error);
  });

  window.FirebasePlugin.subscribe("all");

  // Listen for notifications
  window.FirebasePlugin.onMessageReceived(function (message) {
    console.log("Notification received: ", message);

    if (message.tap) {
      // App was in background and notification was tapped
      alert("Tapped notification: " + message.title);
    } else {
      // App was in foreground when notification arrived
      alert("Foreground notification: " + message.title);
    }
  }, function (error) {
    console.error("Failed to receive message", error);
  });
});



// // Handle incoming FCM messages

// const admin = require("firebase-admin");

// // // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert("/citizen-report-solution-app-firebase-adminsdk-ahk08-493b3d996a.json"),
//   databaseURL: "https://citizen-report-solution-app.firebaseio.com"
// });

// // Function to send notification
// async function sendNotification() {
//   const message = {
//     notification: {
//       title: "New Post",
//       body: "A new post has been added!",
//     },
//     topic: "new_post",
//   };

//   try {
//     const response = await admin.messaging().send(message);
//     console.log("Notification sent:", response);
//   } catch (error) {
//     console.error("Error sending notification:", error);
//   }
// }
// sendNotification();