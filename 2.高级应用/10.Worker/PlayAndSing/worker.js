// JavaScript source code
onmessage = function(event) {
  setInterval(() => {
    postMessage(event.data);
  }, 1000 / 60);
};
