import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCC3Zq0wgcvZDwcKX2nea2mWG45KzNiBuY',
  authDomain: 'crwn-clothing-db-72f9e.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-db-72f9e.firebaseio.com',
  projectId: 'crwn-clothing-db-72f9e',
  storageBucket: 'crwn-clothing-db-72f9e.appspot.com',
  messagingSenderId: '306686237134',
  appId: '1:306686237134:web:2b82591553e2648f74f39f',
  measurementId: 'G-1E5NQ8R7BZ'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (e) {
      console.log('error creating user', e.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;