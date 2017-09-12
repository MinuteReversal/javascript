/*
 * author      :  反转的分针
 * datetime    :  2017-08-25
 * description :  session
 * document https://developer.mozilla.org/zh-CN/docs/Web/API/Storage
*/
var session = {
    dateRegex: /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d+)/,
    set: function (key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    get: function (key) {
        var me = this;
        var value = sessionStorage.getItem(key);
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
        return JSON.parse(value, function (k, v) {
            if (typeof v === "string" && me.dateRegex.test(v)) {
                return new Date(v);
            }
            return v;
        });
    },
    key: function (key) {
        sessionStorage.key(key);
    },
    keys: function () {
        var keys = [];
        for (var i = 0; i < sessionStorage.length; i++) {
            keys.push(sessionStorage.key(i));
        }
        return keys;
    },
    remove: function (key) {
        sessionStorage.removeItem(key);
    },
    clear: function () {
        sessionStorage.clear();
    }
};

Object.defineProperty(session, "length", {
    get: function () {
        return sessionStorage.length;
    }
});