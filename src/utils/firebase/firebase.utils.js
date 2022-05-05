// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, sign } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATl2wkBP--Nbxf39U-Ymb11y_eKaiXUK8",
  authDomain: "crwn-clothing-db-b768e.firebaseapp.com",
  projectId: "crwn-clothing-db-b768e",
  storageBucket: "crwn-clothing-db-b768e.appspot.com",
  messagingSenderId: "291790426381",
  appId: "1:291790426381:web:00aa6f1f28489c34ae2044",
  measurementId: "G-1FJE7XTQ8V"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider();

provider. setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, provider);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);

	console.log(userDocRef);
	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef,{
				displayName,
				email,
				createdAt
			});
		} catch (error) {
			console.log('error creazting user', error.message);
		}
	}

	return userDocRef;
}; 