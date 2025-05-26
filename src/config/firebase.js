// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection, getDocs } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVUnnn5Hp6Y8n180gusn6hwllZy2mV_rs",
  authDomain: "helldivers2loadouts-firebase.firebaseapp.com",
  projectId: "helldivers2loadouts-firebase",
  storageBucket: "helldivers2loadouts-firebase.firebasestorage.app",
  messagingSenderId: "1007801044966",
  appId: "1:1007801044966:web:55b80983235cbde57e9027",
  measurementId: "G-5BVXGNJCS4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const todosCol = collection(db, "todos")
const snapshot = await getDocs(todosCol)

auth.useDeviceLanguage(); // use browser's default language

const googleProvider = new GoogleAuthProvider();

googleProvider.addScope("https://www.googleapis.com/auth/userinfo.email") //adding scope to see user's email address


// detect auth state
onAuthStateChanged(auth, user => {
  if(user !== null){
    console.log("logged in")
  } else {
    console.log("no user")
  }
});