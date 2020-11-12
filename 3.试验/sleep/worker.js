function sleep(milliseconds) {
    let now = Date.now();
    while (Date.now() - now < milliseconds);
}

addEventListener("message", (evt) => {
    sleep(5 * 1000);
    postMessage("complete");
});
