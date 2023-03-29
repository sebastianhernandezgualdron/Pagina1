/**Nombre de Cache y Versión */
const CACHE_KANELASS = 'KanelassV1';

/** Archivos para el cacheo del app se colocan en un array*/
let urlCache = [
    '../',
    '../css/style.css',
    '../dist/app.js',
    '../dist/formulario.js',    
    '../dist/Validacion.js',
    '../images/accessory-gf35d02501_1280.jpg',
    '../images/facebook.png',
    '../images/instagram.png',
    '../images/kanelas.ico',
    '../images/kanelas.jpg',
    '../images/Kanelass128.png',
    '../images/Kanelass256.png',
    '../images/Kanelass512.png' 
    
];

/** Instalar la app con el evento install y va a guardar en cache urlCache */
self.addEventListener('install', (e)=>{
  console.log(e);
    e.waitUntil(
        caches.open(CACHE_KANELASS)
              .then(cache =>{
                return cache.addAll(urlCache)
                        .then(()=>{
                            self.skipWaiting(); //Hace esperar que se carge el array en cache                        
                        });                    
               })
               .catch(err =>{
                console.error("No se ha registrado la cache"+err);
                })
    );
});
/** Activar la app con el evento activate */
self.addEventListener("activate", event => {
    async function deleteOldCaches() {
      // List all caches by their names.
      const names = await caches.keys();
      await Promise.all(names.map(name => {
        if (name !== CACHE_KANELASS) {
          // If a cache's name is the current name, delete it.
          return caches.delete(name);
        }
      }));
    }  
    event.waitUntil(deleteOldCaches());
    self.clients.claim();
  });
/** Instalar la app con el evento fetch 
self.addEventListener('fetch', e=>{
    e.respondWith(
        caches.match(e.request)
                .then(response =>{
                    if(response){
                        return response;
                    }
                    return fetch(e.request);
                })
    );
});*/
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log("[Servicio Worker] Obteniendo recurso: " + e.request.url);
      return (
        r ||
        fetch(e.request).then((response) => {
          return caches.open(CACHE_KANELASS).then((cache) => {
            console.log(
              "[Servicio Worker] Almacena el nuevo recurso: " + e.request.url
            );
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});