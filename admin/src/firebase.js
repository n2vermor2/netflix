import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDYwDxukYAXrcthkE8idG8pvhEnoHaCwj4",
    authDomain: "netflix-8d3fd.firebaseapp.com",
    projectId: "netflix-8d3fd",
    storageBucket: "netflix-8d3fd.appspot.com",
    messagingSenderId: "576355097299",
    appId: "1:576355097299:web:1f98d97835c2fe791e1226",
    measurementId: "G-EEBYW6NEJH"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  export default storage;