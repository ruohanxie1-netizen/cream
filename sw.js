var CACHE='snow-cache-v1';
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){
    return c.addAll(['./','./index.html','./manifest.json']).catch(function(){});
  }));
});
self.addEventListener('activate',function(e){
  self.clients.claim();
});
self.addEventListener('fetch',function(e){
  e.respondWith(
    fetch(e.request).then(function(resp){
      try{
        var copy=resp.clone();
        caches.open(CACHE).then(function(c){c.put(e.request,copy).catch(function(){});});
      }catch(err){}
      return resp;
    }).catch(function(){
      return caches.match(e.request).then(function(r){
        return r||caches.match('./');
      });
    })
  );
});
