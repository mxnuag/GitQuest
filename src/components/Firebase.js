// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCexipuA4PVT17qcxRW1yBFQ0Jc1C1xIN8",
  authDomain: "gitquest-13198.firebaseapp.com",
  projectId: "gitquest-13198",
  storageBucket: "gitquest-13198.appspot.com",
  messagingSenderId: "380355847455",
  appId: "1:380355847455:web:f4fa62d27ba4e53a52fc2a",
  measurementId: "G-T88W3GWTML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Google Auth Provider
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

// Export the auth and googleAuthProvider objects, and signOut function
export { auth, googleAuthProvider};
