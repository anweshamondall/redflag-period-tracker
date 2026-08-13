// Red Flag — Firebase Cloud Messaging service worker
// This file must sit in the SAME folder as index.html and be reachable at:
// https://red-flag-periodtracker.netlify.app/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDYpPG4MPHt7ITu18gn_JVmHJ8_j5CZqU8",
  authDomain: "red-flag-period-tracker.firebaseapp.com",
  projectId: "red-flag-period-tracker",
  storageBucket: "red-flag-period-tracker.firebasestorage.app",
  messagingSenderId: "948230831573",
  appId: "1:948230831573:web:67ead8c82db64d16fdd15c"
});

const messaging = firebase.messaging();

// The GitHub Action sends DATA-ONLY FCM messages.
// Therefore this service worker must explicitly create the notification.
// This avoids the old double-notification problem caused by mixing
// FCM automatic notification display with showNotification().

messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};

  const title = data.title || 'Red Flag 🚩';
  const body = data.body || '';
  const notifType = data.notifType || 'red_flag';

  // One stable tag per alert type. If a duplicate reaches the device,
  // Android replaces/collapses it instead of stacking another notification.
  const tag = `red-flag-${notifType}`;

  self.registration.showNotification(title, {
    body,
    icon: '/app-icon.png',
    badge: '/app-icon.png',
    vibrate: [200, 100, 200],
    silent: false,
    renotify: false,
    tag,
    data: {
      url: './index.html'
    }
  });
});

// Open the app when the notification is tapped.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow('./index.html');
      }
    })
  );
});
