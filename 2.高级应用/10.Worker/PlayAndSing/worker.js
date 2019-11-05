// JavaScript source code
onmessage = function(event) {
  let i = 0;
  for (;;) {
    if (++i === 1000) {
      postMessage(event.data);
      i = 0;
    }
  }
};
