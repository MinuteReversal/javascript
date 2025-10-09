self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
    // 打印收到的推送消息内容
    console.log('收到推送消息:', data);
  } else {
    console.log('收到推送消息，但没有数据');
  }
  const title = data.title || '新消息';
  const options = {
    body: data.body || '你有一条新通知',
    icon: data.icon || '/icon.png'
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});