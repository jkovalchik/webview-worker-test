onmessage = function (e) {
    console.log('Worker recieved data from app:', e.data);
    postMessage('pong');
};

onerror = function (err) {
    console.log('Error in worker:', err);
}
