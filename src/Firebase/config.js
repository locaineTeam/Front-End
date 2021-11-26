import * as firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyABWOgJDSN7jmvSl0S_RdkRCTGc5FsZK5k",
  
    authDomain: "firebox-c44c3.firebaseapp.com",
  
    projectId: "firebox-c44c3",
  
    storageBucket: "firebox-c44c3.appspot.com",
  
    messagingSenderId: "718265270222",
  
    appId: "1:718265270222:web:97de49d602dfdcbe57759f"
  
  };
  
  
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();

  export {projectStorage, projectFirestore};