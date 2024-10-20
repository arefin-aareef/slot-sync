// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB5Sa3LfjB_E8rqznHeZ3LesVcmZ2T6-Tw',
	authDomain: 'slotsync-7bd01.firebaseapp.com',
	projectId: 'slotsync-7bd01',
	storageBucket: 'slotsync-7bd01.appspot.com',
	messagingSenderId: '385267452367',
	appId: '1:385267452367:web:db960fa31260fdabe0aaba',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
