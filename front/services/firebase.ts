// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCzuTYyu0C9Zp-FW7ue-tsgErvDrzLl3GM',
  authDomain: 's4-13-t.firebaseapp.com',
  projectId: 's4-13-t',
  storageBucket: 's4-13-t.appspot.com',
  messagingSenderId: '501512337841',
  appId: '1:501512337841:web:9a42afd0890996aeae2590',
  measurementId: 'G-PK3NK6D3JX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
