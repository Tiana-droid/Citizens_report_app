importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyD9zA-CZn3vR7_5gYkpCeKiP9Xcp-nRcgo",
    authDomain: "citizen-report-solution-app.firebaseapp.com",
    projectId: "citizen-report-solution-app",
    storageBucket: "citizen-report-solution-app.appspot.com",
    messagingSenderId: "423722687960",
    appId: "1:423722687960:android:7cb73534d640237deb66ad",
});

const messaging = firebase.messaging();
// Handle background messages
// This handler is called when the app is in the background or closed
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/favicon-32x32.png",
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
