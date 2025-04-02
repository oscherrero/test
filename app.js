// Registrar el service worker con el alcance correcto
navigator.serviceWorker.register('/test/firebase-messaging-sw.js', { scope: '/test/' })
  .then((registration) => {
    console.log('Service Worker registrado con éxito:', registration);
    // Inicializar Firebase después de registrar el Service Worker
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    // Solicitar permisos de notificación
    const solicitarPermisoBtn = document.getElementById('solicitarPermiso');

    solicitarPermisoBtn.addEventListener('click', () => {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            console.log('Permiso de notificación concedido.');
            mostrarMensaje('Permiso de notificación concedido.', 'success');
            return messaging.getToken();
          } else if (permission === 'denied') {
            console.log('Permiso de notificación denegado.');
            mostrarMensaje('Permiso de notificación denegado.', 'error');
          }
        })
        .then((token) => {
          if (token) {
            console.log('Token de registro FCM:', token);
            // Aquí puedes enviar el token a tu servidor (Google Apps Script)
          }
        })
        .catch((error) => {
          console.error('Error al solicitar permiso de notificación:', error);
          mostrarMensaje('Error al solicitar permiso de notificación: ' + error.message, 'error');
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
  })
  .catch((error) => {
    console.error('Error al registrar el Service Worker:', error);
    mostrarMensaje('Error al registrar el Service Worker: ' + error.message, 'error');
  });

// Función para mostrar mensajes visuales
function mostrarMensaje(mensaje, tipo) {
  const mensajeDiv = document.createElement('div');
  mensajeDiv.textContent = mensaje;
  mensajeDiv.style.position = 'fixed';
  mensajeDiv.style.top = '20px';
  mensajeDiv.style.left = '20px';
  mensajeDiv.style.padding = '10px';
  mensajeDiv.style.borderRadius = '5px';
  mensajeDiv.style.zIndex = '1000';

  if (tipo === 'success') {
    mensajeDiv.style.backgroundColor = '#4CAF50';
    mensajeDiv.style.color = 'white';
  } else if (tipo === 'error') {
    mensajeDiv.style.backgroundColor = '#f44336';
    mensajeDiv.style.color = 'white';
  }

  document.body.appendChild(mensajeDiv);

  // Eliminar el mensaje después de unos segundos
  setTimeout(() => {
    mensajeDiv.remove();
  }, 3000); // 3 segundos
}