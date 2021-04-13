// Define o nome do cache atual, considerando a sua versão.
var cacheName = 'HowManyeLeft-v1.0';

self.addEventListener('install', event => {
  caches.open(cacheName).then(cache => {
    cache.addAll([
      '/',
      '/index.html',
      '/manifest.webmanifest',
      '/styles/colors.css',
      '/styles/edit.css',
      '/styles/home.css',
      '/styles/list.css',
      '/styles/style.css',
      '/scripts/edit.js',
      '/scripts/index.js',
      '/scripts/list.js',
      '/scripts/utils.js',
      '/templates/edit.html',
      '/templates/home.html',
      '/templates/list.html',
      '/assets/images/clock.svg',
      '/assets/images/previous.svg',
      '/assets/images/trash.svg',
      '/assets/icons/',
      '/assets/icons/',
      '/assets/icons/',
      '/assets/icons/',
      '/assets/icons/',
      '/assets/icons/',
      '/assets/icons/',
      '/assets/icons/',
      '/assets/icons/',
      '/assets/icons/',
    ]);
  });
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== cacheName) return caches.delete(key);
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  let resposta = caches.open(cacheName).then(cache =>
    cache.match(event.request).then(recurso => {
      if (recurso) return recurso;
      return fetch(event.request).then(recurso => {
        cache.put(event.request, recurso.clone());
        return recurso;
      });
    })
  );
  event.respondWith(resposta);
});
