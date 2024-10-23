const app = {
    worker: null,

    isDevice () {
        return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
    },

    init () {
        if (app.isDevice()) {
            document.addEventListener('deviceready', app.onDeviceReady, false);
        } else {
            app.onWebReady();
        }
    },

    onDeviceReady () {
        // cordova is now initialized
        console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
        app.setup();
    },

    onWebReady () {
        console.log('Web ready!');
        app.setup();
    },

    setup () {
        console.log('Creating worker');
        app.worker = new Worker('workers/worker.js');

        app.worker.onmessage = function (e) {
            // get data
            const data = e.data;
            console.log('App recieved data from worker:', data);
        };

        app.worker.onerror = function (err) {
            console.error('Worker error in app:', err);
        };
    }
};

app.init();