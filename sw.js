// Caches the app so it opens without internet once it has been loaded.
// Bump VERSION whenever the app files change so phones pick up the update.
const VERSION = "hudhud-v1";
const APP_FILES = [
  "./",
  "index.html",
  "css/style.css",
  "js/names.js",
  "js/themes.js",
  "js/app.js",
  "manifest.webmanifest",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";

  if (url.origin === self.location.origin) {
    // App files: serve from cache, refresh in the background when online.
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fresh = fetch(event.request)
          .then((res) => {
            if (res.ok) caches.open(VERSION).then((c) => c.put(event.request, res.clone()));
            return res;
          })
          .catch(() => cached);
        return cached || fresh;
      })
    );
  } else if (isFont) {
    // Fonts: keep a copy after the first online visit so Arabic/Urdu fonts work offline.
    event.respondWith(
      caches.match(event.request).then((cached) =>
        cached || fetch(event.request).then((res) => {
          caches.open(VERSION).then((c) => c.put(event.request, res.clone()));
          return res;
        }))
    );
  }
});
