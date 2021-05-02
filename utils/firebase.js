import firebase from "firebase/app";
// import config from "../firebase.config";

const config = {
  apiKey: process.env.NEXT_PUBILC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBILC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBILC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBILC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBILC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBILC_FIREBASE_APP_ID,
};

const initFirebase = () => {
  console.log(config);
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};

export default initFirebase;
