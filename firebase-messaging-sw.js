importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');
importScripts('/test/scripts/firebase-config.js');

// Inicializar Firebase en el Service Worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Manejar mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en segundo plano:', payload);
  // Mostrar la notificación
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});