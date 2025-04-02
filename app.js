// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Solicitar permisos de notificación
const solicitarPermisoBtn = document.getElementById('solicitarPermiso');

solicitarPermisoBtn.addEventListener('click', () => {
  messaging.requestPermission()
    .then(() => {
      console.log('Permiso de notificación concedido.');
      return messaging.getToken();
    })
    .then((token) => {
      console.log('Token de registro FCM:', token);
      // Aquí puedes enviar el token a tu servidor (Google Apps Script)
    })
    .catch((error) => {
      console.error('Error al solicitar permiso de notificación:', error);
    });
});

// Manejar mensajes en primer plano
messaging.onMessage((payload) => {
  console.log('Mensaje recibido en primer plano:', payload);
  // Mostrar la notificación
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  new Notification(notificationTitle, notificationOptions);
});