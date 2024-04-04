// Importation de Workbox pour une gestion simplifiée du cache et des stratégies de récupération
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";
const offlineFallbackPage = "offline.html";

// Activation de la précharge de navigation avec Workbox, si disponible
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Installation du service worker et mise en cache de la page hors ligne
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

// Écoute des messages, par exemple pour skipWaiting()
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Gestion des requêtes de navigation en mode hors-ligne
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        const cache = await caches.open(CACHE);
        const cachedResponse = await cache.match(offlineFallbackPage);
        return cachedResponse;
      }
    })());
  }
});

// Écoute de l'événement sync pour la synchronisation en arrière-plan
self.addEventListener('sync', event => {
  if (event.tag === 'send-repair-requests') {
    event.waitUntil(
      // Implémentez ici la logique de récupération des demandes de réparation stockées localement
      // et leur envoi au serveur une fois la connexion rétablie.
      sendRepairRequests().catch(err => console.error('Erreur lors de l'envoi des demandes de réparation : ', err))
    );
  }
});

async function sendRepairRequests() {
  // Votre logique pour récupérer les demandes de réparation du stockage local et les envoyer au serveur.
  console.log('Envoi des demandes de réparation en attente...');
  // Exemple : récupération des demandes de IndexedDB et envoi au serveur.
}


// Ajout de la gestion des notifications push
self.addEventListener('push', (event) => {
  const data = event.data.json(); // Supposons que le payload de la notification est un JSON
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
