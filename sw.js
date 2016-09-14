/**
 * Created by iraquitan on 9/14/16.
 */
var cacheName = 'weatherPWA-v2';
var dataCacheName = 'weatherData-v2';
var filesToCache = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/styles/ud811.css',
    '/images/clear.png',
    '/images/cloudy-scattered-showers.png',
    '/images/cloudy.png',
    '/images/fog.png',
    '/images/ic_add_white_24px.svg',
    '/images/ic_refresh_white_24px.svg',
    '/images/partly-cloudy.png',
    '/images/rain.png',
    '/images/scattered-showers.png',
    '/images/sleet.png',
    '/images/snow.png',
    '/images/thunderstorm.png',
    '/images/wind.png'
];
var weatherAPIUrlBase = 'https://publicdata-weather.firebaseio.com/';

self.addEventListener('install', function (event) {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    )
});

self.addEventListener('fetch', function(event) {
    if (event.request.url.startsWith(weatherAPIUrlBase)) {
        event.respondWith(
            fetch(event.request)
                .then(function(response) {
                    return caches.open(dataCacheName).then(function(cache) {
                        cache.put(event.request.url, response.clone());
                        console.log('[ServiceWorker] Fetched & Cached', event.request.url);
                        return response;
                    });
                })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                console.log('[ServiceWorker] Fetch Only', event.request.url);
                return response || fetch(event.request);
            })
        );
    }
});