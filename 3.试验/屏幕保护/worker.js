const channel = new BroadcastChannel('bg-color-sync');

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function broadcastColor() {
  const color = randomColor();
  channel.postMessage({ color });
}

// 初始广播
broadcastColor();

// 每60秒广播一次
setInterval(broadcastColor, 60 * 1000);