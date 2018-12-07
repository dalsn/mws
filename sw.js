'use strict';

var cacheName = 'restaurantReview-v1';

var filesToCache = ['./', './index.html', './restaurant.html', './js/main.js', './js/restaurant_info.js', './js/db.js', './css/styles.css', 'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css', 'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js', 'https://fonts.googleapis.com/css?family=Work+Sans'];

self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Installed');
	e.waitUntil(caches.open(cacheName).then(function (cache) {
		return cache.addAll(filesToCache);
	}));
});

/*
* check for a response for request in cache
* otherwise request resource over network and cache response
*/
self.addEventListener('fetch', function (e) {
	var requestUrl = new URL(e.request.url);
	if (requestUrl.protocol.startsWith('http')) {
		e.respondWith(caches.open(cacheName).then(function (cache) {
			return cache.match(e.request, { ignoreSearch: true }).then(function (response) {
				if (response) {
					return response;
				}

				return fetch(e.request).then(function (networkResponse) {
					cache.put(e.request, networkResponse.clone());
					return networkResponse;
				});
			});
		}));
	}
});