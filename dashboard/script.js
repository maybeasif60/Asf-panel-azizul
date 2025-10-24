import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBEKuc4mzaWI5I6R9QgAeDHMz13bKk5Oy4",
    authDomain: "asf-panel-azizul.firebaseapp.com",
    projectId: "asf-panel-azizul",
    storageBucket: "asf-panel-azizul.firebasestorage.app",
    messagingSenderId: "444571143429",
    appId: "1:444571143429:web:a435815af2bbd7c2d0bb6c",
    measurementId: "G-79PTWV1GY4"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const userNameEl = document.getElementById('userName');

// Check login state
onAuthStateChanged(auth, (user) => {
  if (user) {
    if(userNameEl) {
      // Show user's email or display name
      userNameEl.textContent = user.displayName || user.email || "User";
    }
  } else {
    // Redirect to login if not logged in
    window.location.href = '../login/index.html';
  }
});

// Logout function
window.logout = () => {
  signOut(auth)
    .then(() => {
      window.location.href = '../login/';
    })
    .catch((error) => {
      console.error("Logout failed:", error);
      alert("Logout failed. Try again.");
    });
};
