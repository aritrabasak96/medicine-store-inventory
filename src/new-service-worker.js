// main service worker file
// life cycle of service worker
// change

const cacheName = "static-cache-v5";

const cacheContent = [

  "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "./index.html",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.googleapis.com/css?family=Noto+Sans|Noto+Serif&display=swap",
  "https://fonts.googleapis.com/css?family=Roboto&display=swap",
  "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
  "../static/css/2.83342f34.chunk.css",
  "../static/css/2.83342f34.chunk.css.map",
  "../static/css/main.10632b75.chunk.css",
  "../static/css/main.10632b75.chunk.css.map",
  "../static/js/2.9bce066b.chunk.js",
  "../static/js/2.9bce066b.chunk.js.LICENSE.txt",
  "../static/js/2.9bce066b.chunk.js.map",
  "../static/js/main.b7492e71.chunk.js",
  "../static/js/main.b7492e71.chunk.js.map",
  "../static/js/runtime-main.bb0f5578.js",
  "../static/js/runtime-main.bb0f5578.js.map",
]


self.addEventListener('install',evnt=>{

  // change
  // add those cache assests
  evnt.waitUntil(

    caches.open(cacheName).then(cache=>{
      return cache.addAll(cacheContent);
    })

  );

});

self.addEventListener('activate',evnt=>{


  evnt.waitUntil(

     caches.keys().then(keys=>{

       return Promise.all(keys
         .filter(key => key !== cacheName)
         .map(key => caches.delete(key))
       )
     })

  );

});


// fetch event
self.addEventListener('fetch',evnt=>{

//  console.log("execute fetch---------------",evnt.request);
  // before sending request to the server, check those contents are present or not
  evnt.respondWith(

    caches.match(evnt.request).then(cacheRes=>{

  //   console.log("cacheRes-------------------",cacheRes);
     return cacheRes || fetch(evnt.request)

    })
  );

});
