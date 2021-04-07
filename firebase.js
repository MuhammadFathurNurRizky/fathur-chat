import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBg08o-CzldUY8pq_z556xWXMhSaE0RQvA",
    authDomain: "fathur-s-chatapp.firebaseapp.com",
    projectId: "fathur-s-chatapp",
    storageBucket: "fathur-s-chatapp.appspot.com",
    messagingSenderId: "508699449401",
    appId: "1:508699449401:web:380439b0346fadd7df95e8",
    measurementId: "G-EYLY9L4RZW"
};

// Access the firestore
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// Access to database firestore
const db = app.firestore();
// Access to authentication firestore
const auth = app.auth();
// Access to GoogleProvider firestore
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };