// Importation de Workbox pour une gestion simplifiée du cache et des stratégies de récupération
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

// Nom du cache
const CACHE_NAME = 'pwabuilder-page';
const offlineFallbackPage = 'offline.html';

// Activation de la précharge de navigation avec Workbox, si disponible
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Utilisation de Workbox pour la mise en cache des ressources statiques lors de l'installation du service worker
workbox.precaching.precacheAndRoute([
  { url: '/', revision: null },
  { url: '/index.html', revision: null },
  { url: 'assets/css/style.css', revision: null },
  { url: '/js/app.js', revision: null },
]);

// Stratégie de récupération des ressources avec Workbox
workbox.routing.registerRoute(
  ({request}) => request.destination === 'document' ||
                 request.destination === 'script' ||
                 request.destination === 'style',
  new workbox.strategies.NetworkFirst()
);

// Installation du service worker et mise en cache de la page hors ligne
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

// Écoute des messages, par exemple pour skipWaiting()
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Gestion des requêtes de navigation en mode hors-ligne avec Workbox
workbox.routing.registerRoute(
  // Match web navigation requests
  ({request}) => request.mode === 'navigate',
  // Use NetworkFirst strategy
  new workbox.strategies.NetworkFirst({
    cacheName: CACHE_NAME,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

// Écoute de l'événement sync pour la synchronisation en arrière-plan
self.addEventListener('sync', event => {
  if (event.tag === 'send-repair-requests') {
    event.waitUntil(
      sendRepairRequests().catch(err => console.error('Erreur lors de lenvoi des demandes de réparation : ', err))
    );
  }
});

async function sendRepairRequests() {
  console.log('Envoi des demandes de réparation en attente...');
}

// Ajout de la gestion des notifications push
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const title = data.title || "Notification";
  const options = {
    body: data.body || "Vous avez un nouveau message.",
    icon: 'images/icon-192x192.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});


// Enregistrement du service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('pwabuilder-sw.js')
      .then(registration => {
        // Service Worker enregistré avec succès
        console.log('Service Worker enregistré avec succès : ', registration);

        // Planification de la synchronisation en arrière-plan
        if ('SyncManager' in window) {
          registration.sync.register('send-repair-requests').then(() => {
            console.log('Synchronisation en arrière-plan enregistrée.');
          }).catch(err => {
            console.log('Erreur lors de l’enregistrement de la synchronisation en arrière-plan', err);
          });
        }
      })
      .catch(err => {
        // Erreur lors de l’enregistrement du Service Worker
        console.error('Erreur lors de l’enregistrement du Service Worker : ', err);
      });
  });
}
