// Red Flag Firebase Cloud Messaging service worker
// Must be served from the same origin as index.html.

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

// GitHub Actions sends DATA-ONLY FCM messages. We create exactly one
// notification here so FCM cannot also auto-display a second one.
messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  const title = data.title || 'Red Flag 🚩';
  const body = data.body || '';
  const notifType = data.notifType || 'red_flag';

  const tag = `red-flag-${notifType}`;

  return self.registration.showNotification(title, {
    body,
    icon: '/app-icon.png',
    badge: '/app-icon.png',
    tag,
    renotify: true,
    requireInteraction: false,
    silent: false,
    vibrate: [200, 100, 200],
    data: { url: '/index.html' }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    for (const client of clientList) {
      if ('focus' in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow('/index.html');
  }));
});
