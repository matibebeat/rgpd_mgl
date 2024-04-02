class GPTConfig {
  constructor() {
    this.data = {
      mode: 'on',
      status: 'ready',
    };
    this.load();
  }

  async load() {
    const items = await chrome.storage.sync.get(["GPTConfig"])
    this.data = { ...this.data, ...items.GPTConfig }
  }

  save() {
    chrome.storage.sync.set({ "GPTConfig": this.data })
  }
}

const config = new GPTConfig();


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlaBMURHcpLmr1dbID7L9fgx7prpFfshw",
  authDomain: "cgucheckers.firebaseapp.com",
  projectId: "cgucheckers",
  storageBucket: "cgucheckers.appspot.com",
  messagingSenderId: "133644881232",
  appId: "1:133644881232:web:f9972790c4bceb26acf055"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = app.firestore();

async function retrieveData() {
  try {
    const snapshot = await db.collection("websites").get();
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}

retrieveData();

init()
