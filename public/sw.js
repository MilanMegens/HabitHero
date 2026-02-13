// Verplicht voor PWA: een fetch event handler
self.addEventListener('fetch', (event) => {
  // We laten de browser de normale request afhandelen, 
  // maar de aanwezigheid van dit event is nodig voor de 'Install' prompt.
  return;
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Luister naar push meldingen (voor de toekomst)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'HabitHero', body: 'Tijd voor je gewoonte!' };
  const options = {
    body: data.body,
    icon: '/placeholder.svg',
    badge: '/placeholder.svg',
    vibrate: [200, 100, 200],
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});