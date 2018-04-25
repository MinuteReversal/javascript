onmessage = function (e) {
    postMessage([e.data,Date.now()]);
}