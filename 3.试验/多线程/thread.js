importScripts("../随机数/random.js");
onmessage = function (event) {
    var data = event.data;
    console.log(data+"start");
    setTimeout(function () {
        postMessage(data);
        console.log(data + "end");
    }, getRandomInt(0,data) * 1000);
}