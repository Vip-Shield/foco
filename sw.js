const CACHE_NAME = 'studyflow-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // Se você tiver os ícones, o SW vai salvá-los também:
  './icon-192.png',
  './icon-512.png'
];

// Instalação: Cacheia os arquivos principais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Ativação: Limpa caches antigos se você atualizar o app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Interceptação: Serve o cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});