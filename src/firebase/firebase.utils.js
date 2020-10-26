import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBd5z45uGZdGuIChbHLxtUg6GxB7Dlv-mw",
    authDomain: "react-kummu.firebaseapp.com",
    databaseURL: "https://react-kummu.firebaseio.com",
    projectId: "react-kummu",
    storageBucket: "react-kummu.appspot.com",
    messagingSenderId: "709816197032",
    appId: "1:709816197032:web:0d9f56bfa0b8211967c79d",
    measurementId: "G-9PNJ5PV9ZY"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
