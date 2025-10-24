import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBEKuc4mzaWI5I6R9QgAeDHMz13bKk5Oy4",
    authDomain: "asf-panel-azizul.firebaseapp.com",
    projectId: "asf-panel-azizul",
    storageBucket: "asf-panel-azizul.firebasestorage.app",
    messagingSenderId: "444571143429",
    appId: "1:444571143429:web:a435815af2bbd7c2d0bb6c",
    measurementId: "G-79PTWV1GY4"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error-msg');

// Redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if(user){
    console.log("Logged in UID:", user.uid);
    window.location.href = '..//dashboard/index.html';
  }
});

// Handle login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      console.log("Logged in UID:", uid);
      window.location.href = '..//dashboard/index.html';
    })
    .catch((error) => {
      let message = "";

      switch(error.code){
        case "auth/invalid-email":
          message = "❌ Email ঠিক হয়নি।";
          break;
        case "auth/user-not-found":
          message = "❌ User পাওয়া যায়নি।";
          break;
        case "auth/wrong-password":
          message = "❌ Password ভুল।";
          break;
        case "auth/too-many-requests":
          message = "❌ অনেকবার চেষ্টা হয়েছে, কিছুক্ষণ পরে আবার চেষ্টা করুন।";
          break;
        default:
          message = "❌ Login করতে সমস্যা হচ্ছে।";
      }

      errorMsg.textContent = message;
    });
});
