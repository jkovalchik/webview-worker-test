onmessage = function (e) {
    const data = e.data;
    console.log('Worker recieved data from app:', data);
};

onerror = function (err) {
    console.log('Error in worker:', err);
}