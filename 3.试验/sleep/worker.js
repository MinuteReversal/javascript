//https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
importScripts("sleep.js");

addEventListener("message", (evt) => {
    sleep(5 * 1000);
    postMessage("complete");
});
