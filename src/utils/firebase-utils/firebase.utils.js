import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  collection,
  writeBatch,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_measurementId,
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// TODO: Sign in with redirect method example
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  filed = 'title',
) => {
  const collectionRef = collection(db, collectionKey);

  // For having successful transaction we need batch
  // TODO: What is batch ?
  const batch = writeBatch(db);

  // with batch we can attach bunch of functions together like, write, set, read, delete, ...
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[filed].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('Done');
};

export const getCatgoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user ', error.message);
    }
  }

  return userDocRef;
};

export const createAuthWithUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signInWithUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);
