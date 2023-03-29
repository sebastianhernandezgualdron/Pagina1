
//Service Worker
if('serviceWorker' in navigator){
    console.log('Service Worker is available');    
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('./dist/serviceWork.js')
            .then(response=>console.log('Service Worker:'+response))
            .catch(err=>console.error(err));
        
        });     
}




