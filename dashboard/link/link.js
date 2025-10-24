import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";
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
const db = getDatabase(app);
const auth = getAuth(app);

// DOM
const linkNameInput = document.getElementById("linkName");
const linkURLInput = document.getElementById("linkURL");
const addBtn = document.getElementById("addBtn");
const linkTable = document.querySelector("#linkTable tbody");
const logoutBtn = document.getElementById("logoutBtn");

// Auth check
onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = "../login/login.html";
});

// Add link (no UID/ref appended)
addBtn.addEventListener("click", async () => {
  const name = linkNameInput.value.trim();
  let url = linkURLInput.value.trim();

  if (!name || !url) return alert("Enter both name and URL");

  // Add https:// if missing
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  await push(ref(db, "links"), { name, url });
  linkNameInput.value = "";
  linkURLInput.value = "";
});

// Display links and delete
onValue(ref(db, "links"), (snapshot) => {
  linkTable.innerHTML = "";
  snapshot.forEach((child) => {
    const { name, url } = child.val();
    const key = child.key;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td><a href="${url}" target="_blank">${url}</a></td>
      <td><button class="delete" data-id="${key}">Delete</button></td>
    `;
    linkTable.appendChild(row);
  });

  // Delete button
  document.querySelectorAll(".delete").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      await remove(ref(db, `links/${id}`));
    };
  });
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "../login/";
});
