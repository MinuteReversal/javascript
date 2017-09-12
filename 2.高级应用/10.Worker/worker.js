// JavaScript source code
onmessage = function (event) {
    var data = event.data;
    setTimeout(function () { postMessage(data + " world"); }, 10000);
};