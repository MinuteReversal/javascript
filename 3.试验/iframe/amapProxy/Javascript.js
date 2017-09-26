/**
 * author:zhy
 * date:20170922
 * version:1.0
 */
var amapProxy = {
    url: "https://mp.caiyunlife.com/AmapGPSObject.html",
    fnCallback: function (position) { },
    iframe: null,
    init: function () {
        var me = this;
        window.addEventListener("message", function (event) {
            if (event.data === "amap read") {
                me.onRead();
            }
            else if (/^position:/.test(event.data)) {
                me.fnCallback("success", JSON.parse(event.data.replace(/^position:/, "")));
            }
            else if (/^error:/.test(event.data)) {
                me.fnCallback("error", event.data.replace(/^error:/, ""));
            }
        });

        me.createIframe();
    },
    onRead: function () { },
    createIframe: function () {
        var me = this;
        var iframe = me.iframe = document.createElement("iframe");
        iframe.src = me.url;
        iframe.style.display = "none";
        document.body.appendChild(iframe);
    },
    getLocation: function (fnCallback) {
        var me = this;
        if (typeof fnCallback === "function") me.fnCallback = fnCallback;
        me.iframe.contentWindow.postMessage("amap", "*");
    }
};
window.addEventListener("DOMContentLoaded", function () {
    amapProxy.init();
});
