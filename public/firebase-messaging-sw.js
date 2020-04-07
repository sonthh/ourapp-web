// Give the service worker access to Firebase Messaging.
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
var config = {
  apiKey: "AIzaSyAZhsPlgGV28zIoAVnOhfSGfvYAwNw1jGc",
  authDomain: "ourapp-local.firebaseapp.com",
  databaseURL: "https://ourapp-local.firebaseio.com",
  projectId: "ourapp-local",
  storageBucket: "ourapp-local.appspot.com",
  messagingSenderId: "672856742639",
  appId: "1:672856742639:web:3264e407d5d729958d191a",
  measurementId: "G-ETD4ELT42H"
};
firebase.initializeApp(config);

// Retrieve an instance of Firebase Data Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(payload);
  
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});

self.addEventListener('notificationclick', function (event) {
  // do what you want
  // ...
  console.log('click notification');
  
});
