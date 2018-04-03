onmessage = function (e) {
    var args = e.data;
    postMessage(Date.now());
}