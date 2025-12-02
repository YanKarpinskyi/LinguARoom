const CACHE_NAME = "linguARoom-v10"; 

const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/main.css",
  "/js/index.js",
  "/assets/video/lr-bg.mp4",
  "/assets/audio/fireplace.mp3",
  "/assets/audio/bg-music.mp3",
  "/assets/icons/logo192.png",
  "/assets/icons/logo512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .catch(err => console.error("Cache failed:", err))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        if (response.status === 200) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      });
    }).catch(() => caches.match("/index.html"))
  );
});