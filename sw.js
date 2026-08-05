const CACHE_NAME = 'fencing-pro-v2-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // NUNCA interceptar peticiones a Supabase (auth + API)
  if (url.hostname.includes('supabase.co')) {
    return;
  }

  // NUNCA interceptar POST, PUT, DELETE, PATCH
  if (event.request.method !== 'GET') {
    return;
  }

  // Para navegación (la página principal): NETWORK FIRST
  // Esto evita que el SW sirva una versión cacheada del login
  // cuando el usuario vuelve del redirect de Google OAuth
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Actualizar cache con la versión fresca
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
          return networkResponse;
        })
        .catch(() => {
          // Si no hay red, usar cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Para el resto de recursos estáticos: CACHE FIRST
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Solo cachear respuestas válidas de mismo origen
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });
        return networkResponse;
      });
    })
  );
});
