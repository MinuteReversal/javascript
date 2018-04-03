//https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker
var w = new Worker("myWorker.js");
w.onmessage = function (arg) {
    console.log(arg);
};
for (var i = 0; i < 10; i++) {
    w.postMessage([i]);
}