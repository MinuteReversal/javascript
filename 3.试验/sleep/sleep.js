function sleep(milliseconds) {
    let now = Date.now();
    while (Date.now() - now < milliseconds);
}

function sleepAsync(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, milliseconds);
    });
}
