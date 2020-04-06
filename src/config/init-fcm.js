import * as firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAZhsPlgGV28zIoAVnOhfSGfvYAwNw1jGc",
  authDomain: "ourapp-local.firebaseapp.com",
  databaseURL: "https://ourapp-local.firebaseio.com",
  projectId: "ourapp-local",
  storageBucket: "ourapp-local.appspot.com",
  messagingSenderId: "672856742639",
  appId: "1:672856742639:web:3264e407d5d729958d191a",
  measurementId: "G-ETD4ELT42H"
};

const initializedFirebaseApp = firebase.initializeApp(firebaseConfig);

const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey(
  "BCwnye09FqtX4so1suCuIFE9itRys0NvhCAPSGmW4nTprDiS5_6fe9oQbsPOOC_epEMouqQRIVn-MRNpNIWsvzQ"
);

export { messaging };