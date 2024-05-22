// install event
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Installed", e);
  // 여기에서 캐시할 리소스를 지정할 수 있습니다.
});

// activate event
self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activated", e);
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== 'my-cache-name') {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (e) => {
  console.log("[Service Worker] Fetched resource " + e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => {
      if (response) {
        return response;
      }
      var fetchRequest = e.request.clone();

      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        var responseToCache = response.clone();

        caches.open('my-cache-name').then(cache => {
          cache.put(e.request, responseToCache);
        });

        return response;
      });
    })
  );
});
