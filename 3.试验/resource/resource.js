/**
 * @author   : zhy
 * @datetime : 2018-01-02
 * @description image audio video manager
 */

var Resource = function () {
    this.list = [];
    this.cache = true;
    this.isAutoLoad = true;
    this.isComplete = false;
    if (arguments[0] instanceof Object) {
        Object.assign(this, arguments[0]);
    }
    this.loadAll();
};

Resource.prototype.ajax = function (options) {
    var me = this;
    var xhr = new XMLHttpRequest();
    var settings = Object.assign({
        url: "",
        method: "GET",
        body: null,
        onLoad: function (xhr) {

        },
        onError: function (xhr) {

        },
        onComplete: function (xhr) {

        }
    }, options);

    xhr.addEventListener("load", function (evt) {
        settings.onLoad(this);
    });
    xhr.addEventListener("error", function (evt) {
        settings.onError(this);
    });
    xhr.addEventListener("complete", function (evt) {
        settings.onComplete(this);
    });
    xhr.open(settings.method, settings.url);
    xhr.responseType = "arraybuffer";
    xhr.send(settings.body);
};

Resource.prototype.httpGet = function (url, fnOnLoad) {
    var me = this;
    me.ajax({
        url: url,
        method: "GET",
        onLoad: fnOnLoad
    });
};

Resource.prototype.httpPost = function (url, body, fnOnLoad) {
    var me = this;
    me.ajax({
        url: url,
        method: "POST",
        body: body,
        onLoad: fnOnLoad
    });
};

Resource.prototype.httpPut = function (url, body, fnOnLoad) {
    var me = this;
    me.ajax({
        url: url,
        method: "PUT",
        body: body,
        fnOnLoad: fnOnLoad
    });
};

Resource.prototype.httpDelete = function (url, fnOnload) {
    var me = this;
    me.ajax({
        url: url,
        method: "DELETE",
        fnOnLoad: fnOnLoad
    });
};

Resource.prototype.loadAll = function () {
    var me = this;
    for (var i = 0, item; item = me.list[i]; i++) {
        me.load(item);
    }
};

Resource.prototype.load = function (key) {
    var me = this;
    var item = null;
    if (key instanceof String) {
        item = me.get(key);
    }
    else if (key instanceof Object) {
        item = key;
    }

    if (item) {
        me.httpGet(item.src, function (xhr) {
            item.binary = xhr.response;
            item.contentType = xhr.getResponseHeader("content-type");
        });
    }
};

Resource.prototype.add = function (key, src) {
    var me = this;
    var r = me.get(key);
    if (!r) {
        var item = { key: key, src: src, binary: [], contentType: "" };
        me.list.push(item);
        me.load(item);
    }
};

Resource.prototype.get = function (key) {
    var me = this;
    for (var i = 0, item; item = me.list[i]; i++) {
        if (item.key === key) {
            return item;
        }
    }
    return null;
};

Resource.prototype.getBase64 = function (key) {
    var me = this;
    var o = me.get(key);
    if (o) return me.arrayBufferToBase64(o.binary, o.contentType);
    return null;
};

Resource.prototype.remove = function (key) {
    var me = this;
    me.list.splice(me.list.indexOf(me.get(key)), 1);
};

Resource.prototype.arrayBufferToBase64 = function (arraybuffer, type) {
    return URL.createObjectURL(new Blob([new Uint8Array(arraybuffer)], { type: type }));
};
