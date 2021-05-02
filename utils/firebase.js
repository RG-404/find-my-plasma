import firebase from "firebase/app";
// import config from "../firebase.config";

// const config = {
//   apiKey: process.env.NEXT_PUBILC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBILC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBILC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBILC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBILC_FIREBASE_MESSAGE_SENDER_ID,
//   appId: process.env.NEXT_PUBILC_FIREBASE_APP_ID,
// };

const config = {
  apiKey: "AIzaSyBM4vK778toP83COqKQWF9loxiY7mqPga8",
  authDomain: "find-my-plasma.firebaseapp.com",
  projectId: "find-my-plasma",
  storageBucket: "find-my-plasma.appspot.com",
  messagingSenderId: "61512897111",
  appId: "1:61512897111:web:ea2e5ed54420240ee2c912",
};

const initFirebase = () => {
  console.log(config);
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};

export default initFirebase;
