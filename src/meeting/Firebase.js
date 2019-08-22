import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBf9-ZwSQCMeLXrJR9CV3MbwH_miwedswM",
  authDomain: "sms-webex.firebaseapp.com",
  databaseURL: "https://sms-webex.firebaseio.com",
  projectId: "sms-webex",
  storageBucket: "sms-webex.appspot.com",
  messagingSenderId: "929453062816"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
