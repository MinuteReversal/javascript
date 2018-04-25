onmessage = function (e) {
    var money = e.data.money;
    var balance = e.data.balance;
    var result = balance - money >= 0 ? balance - money : balance;
    postMessage(result);
};