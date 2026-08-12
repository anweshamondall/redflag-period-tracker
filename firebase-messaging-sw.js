// This file must sit in the SAME folder as index.html, and must be reachable
// at the exact URL yoursite.com/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// PASTE THE SAME firebaseConfig VALUES YOU USED IN index.html
firebase.initializeApp({
  apiKey: "AIzaSyDYpPG4MPHt7ITu18gn_JVmHJ8_j5CZqU8",
  authDomain: "red-flag-period-tracker.firebaseapp.com",
  projectId: "red-flag-period-tracker",
  storageBucket: "red-flag-period-tracker.firebasestorage.app",
  messagingSenderId: "948230831573",
  appId: "1:948230831573:web:67ead8c82db64d16fdd15c"
});

const messaging = firebase.messaging();

// FCM notification payloads are displayed automatically by Firebase when the
// app is in the background. Do not call showNotification() here as well, or
// the same push can appear twice.
