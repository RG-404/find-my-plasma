import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBM4vK778toP83COqKQWF9loxiY7mqPga8",
  authDomain: "find-my-plasma.firebaseapp.com",
  projectId: "find-my-plasma",
  storageBucket: "find-my-plasma.appspot.com",
  messagingSenderId: "61512897111",
  appId: "1:61512897111:web:ea2e5ed54420240ee2c912",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
