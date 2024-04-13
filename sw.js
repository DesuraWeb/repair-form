// Importation de Workbox pour une gestion simplifiée du cache et des stratégies de récupération
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

// Vérification que Workbox est disponible
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // Nom du cache
  const CACHE_NAME = 'pwabuilder-page';
  const offlineFallbackPage = '/offline.php';

  // Activation de la précharge de navigation avec Workbox, si disponible
  if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
  }

  // Utilisation de Workbox pour la mise en cache des ressources statiques lors de l'installation du service worker
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: null },
    { url: '/index.php', revision: null },
    { url: '/assets/css/style.css', revision: null },
    { url: '/js/app.js', revision: null },
    { url: offlineFallbackPage, revision: null }
  ]);

  // Stratégie de récupération des ressources avec Workbox
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'document' ||
                   request.destination === 'script' ||
                   request.destination === 'style',
    new workbox.strategies.NetworkFirst()
  );

// Gestion des requêtes de navigation en mode hors-ligne avec Workbox
workbox.routing.registerRoute(
  ({request}) => request.mode === 'navigate',
  async ({event}) => {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }
        return await workbox.strategies.NetworkFirst({
          cacheName: CACHE_NAME,
          plugins: [
            new workbox.expiration.ExpirationPlugin({
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
          ],
        }).handle({event});
      } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        return await cache.match(offlineFallbackPage) || await caches.match('/offline.php');
      }
    })());
  }
);

  
  // Écoute des messages, par exemple pour skipWaiting()
  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });

  // Écoute de l'événement sync pour la synchronisation en arrière-plan
  self.addEventListener('sync', (event) => {
    if (event.tag === 'send-repair-requests') {
      event.waitUntil(
        sendRepairRequests().catch(err => console.error('Erreur lors de l\'envoi des demandes de réparation : ', err))
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
      icon: '/images/icon-192x192.png',
      badge: '/images/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
  });
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
