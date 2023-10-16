import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAQMdjMsGoCCC-AtPvwxd0x-6WoqDrGrTQ",
    authDomain: "mymoney-76f83.firebaseapp.com",
    projectId: "mymoney-76f83",
    storageBucket: "mymoney-76f83.appspot.com",
    messagingSenderId: "362441664710",
    appId: "1:362441664710:web:fc2097f911840f98390fc7",
    measurementId: "G-6X3YRV3JS7"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig);

  //init service

  const projectFirestore=firebase.firestore();
  const projectAuth=firebase.auth();
  const timestamp=firebase.firestore.Timestamp;
  export {projectFirestore,projectAuth,timestamp}