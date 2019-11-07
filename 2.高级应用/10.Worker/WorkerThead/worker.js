// JavaScript source code
onmessage = event => {
  let i = event.data;

  while (true) {
    i++;
    if (i % 10000000 === 0) {
      postMessage(i);
    }
  }
};
