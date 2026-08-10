/* StitchBook Enterprise v2 — service worker
   Provides offline support + installability (PWA).
   Cache-first for app shell, network-first fallback for everything else. */
const CACHE = 'stitchbook-enterprise-v2';
const APP_SHELL = ['/', '/index.html', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return; // don't intercept cross-origin

  // Cache-first for app assets.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        // Refresh cache in background.
        fetch(request)
          .then((res) => {
            if (res && res.ok) caches.open(CACHE).then((c) => c.put(request, res));
          })
          .catch(() => {});
        return cached;
      }
      return fetch(request)
        .then((res) => {
          const copy = res.clone();
          if (res.ok) caches.open(CACHE).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() =>
          url.pathname.startsWith('/assets') ? caches.match('/index.html') : Response.error()
        );
    })
  );
});
