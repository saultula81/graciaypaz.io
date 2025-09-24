// service-worker.js

const CACHE_NAME = 'cristo-player-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/fondo.png',
  '/fondodark.png',
  '/manifest.json',
  '/script.js',
  '/service-worker.js',
   // Asegúrate de agregar todos los archivos estáticos que deseas almacenar en caché
  'https://stream.zeno.fm/mfer4shs398uv'  // Agrega recursos externos que deseas almacenar en caché
];

// Instalar el service worker y almacenar en caché los archivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Archivos en caché durante la instalación');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

// Activar el service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("gyp-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/app.js",
        "/icon192.png",
        "/icon512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request);
    })
  );
});
