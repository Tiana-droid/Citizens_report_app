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

// import { initializeApp } from '/node_modules/firebase/app/dist/app/index.d.ts';
// import firebase from 'firebase/app';



// FCMPlugin.getToken(function (token) {
//   //this is the FCM token which can be used
//   //to send notification to specific device
//   console.log(token);
//   FCMPlugin.onNotification(
//     onNotificationCallback(data),
//     successCallback(msg),
//     errorCallback(err)
//   );
//   //Here you define your application behaviour based on the notification data.
//   FCMPlugin.onNotification(function (data) {
//     console.log(data);
//     //data.wasTapped == true means in Background :  Notification was received on device tray and tapped by the user.
//     //data.wasTapped == false means in foreground :  Notification was received in foreground. Maybe the user needs to be notified.
//     if (data.wasTapped) {
//       //Notification was received on device tray and tapped by the user.
//       alert(JSON.stringify(data));
//     } else {
//       //Notification was received in foreground. Maybe the user needs to be notified.
//       alert(JSON.stringify(data));
//     }
//   });
// });
