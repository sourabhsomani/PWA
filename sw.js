//This message will be work only first time when the service worker will be register in the browser
console.log("Hello Service worker is Working...");

const version="1.9";
const cacheList=[
    'https://www.c-sharpcorner.com/article/how-to-enable-https-on-your-website-for-free/',
    'https://www.c-sharpcorner.com/article/flutter-with-android-studio-step-by-step-installation-guide/'
]
//This event fires when service worker will be install. Well this fires on the first time.
self.addEventListener('install',function(event){
    console.log("Service Worker is Installing")
    caches.open(version).then(cache=>{
        cache.addAll(cacheList)
    })
})

//After installing service worker, This always waits for the activation
self.addEventListener('activate',function(event){
    console.log("Service worker is activating...");
    //This will wait untill we will not cache all the files w
    event.waitUntil(
        caches.keys().then(cacheNames => {
            cacheNames.forEach(value => {
              if (value.indexOf(version) < 0) {
                caches.delete(value);
              }
            });
            console.log("service  has been activated");
            return;
          })
    );
})