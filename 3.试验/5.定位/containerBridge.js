/**
 * Asynchronous Javascript And XML
 * @class AjaxOptions
 */
function AjaxOptions(url, method, data, onComplete) {
    this.EnumMethodType = {
        "GET": "GET",
        "POST": "POST"
    };
    this.url = "";
    this.method = this.EnumMethodType.GET;
    this.data = null;
    this.cache = true;

    if (url) this.ur = url;
    if (method) this.method = method;
    if (data) this.data = data;
    if (onComplete) this.onComplete = onComplete;
}

AjaxOptions.prototype.onComplete = function (result) { };
AjaxOptions.prototype.onSuccess = function (result) { };
AjaxOptions.prototype.onError = function (result) { };

﻿/**
 * @class AppOptions
 * @description :设置容器的appID和appSecret
  */
function AppOptions(appId, appSecret) {
    this.appId = "";
    this.appSecret = "";

    if (appId) this.appId = appId;
    if (appSecret) this.appSecret = appSecret;
}﻿/**
 * 扫码设置
 * @property DefaultScanOptions 
 * @type Object
 */
function ScanOptions() {
    /**
     * 扫码类型
     * @attribute scanType
     * @type scanType
     * @default scanType.qrCode
     */
    this.scanType = ScanType.qrCode;

};

/**
 * 
 * @event onComplete
 */
ScanOptions.prototype.onComplete = function (resultStr /*扫描结果*/) {
    console.log(resultStr);
}//扫描回调


﻿/**
 * 日志
 * @class BridgeLogger
 * @constructor
 */
function BridgeLogger() {
    var me = this;
}

/**
 * 写日志
 * @method write
 * @param {String} text 
 * @return {void} 
 */
BridgeLogger.prototype.write = function (text) {
    var me = this;
    if (ContainerBridgeConfig.debug) {
        prompt("日志信息", text);
    }
};﻿/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @enum BridgeEventType
 */
var BridgeEventType = {
    /**
     * @event ready
     */
    "ready": "ready"
};﻿/**
 * author : codec007
 * date   : 20160122
 */

/**
 * 未实现
 * @exception NotImplementException
 * @return {void} 
 */
function NotImplementException(message) {
    Error.call(this);
    this.message = "Not Implement!";
    if (message) this.message = message;
}

/**
 * NotImplementException inherit Error
 */
NotImplementException.prototype = Object.create(Error.prototype);


/**
 * 不支持的异常
 * @exception  UnSupportedException 
 * @param {String} message 
 * @return {void}
 */
function UnSupportedException(message) {
    Error.call(this);
    this.message = message;
}

/**
 * UnSupportedException inherit Error
 */
UnSupportedException.prototype = Object.create(Error.prototype);


/**
 * 参数异常
 * @exception  ArgumentException 
 * @param {String} message 
 * @returns {void} 
 */
function ArgumentException(message) {
    Error.call(this);
    this.message = message;
}

/**
 * ArgumentException inherit Error
 */
ArgumentException.prototype = Object.create(Error.prototype);
﻿/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @enum BridgeEventType
 */
var BridgeEventType = {
    /**
     * @event ready
     */
    "ready": "ready"
};﻿/**
 * 容器类型
 * @enum ContainerType
 */
var ContainerType = { "Wechat": "Wechat", "Alipay": "Alipay", "Android": "Android", "WindowsPhone": "WindowsPhone", "iOS": "iOS", "PC": "PC", "Rel": "rel", "Mobile": "Mobile" };

/**
 * 扫描类型
 * @enum scanType 
 */
var ScanType = { "barCode": "barCode", "qrCode": "qrCode", "cardNumber": "cardNumber" }﻿/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @interface IjsBridge
 */
function IjsBridge() { }

/**
 * 复制属性
 * @method extend 
 * @abstract 
 * @param {Object} object,object,object...
 * @return {void} 
 */
IjsBridge.prototype.extend = function ( /*...*/) { throw new NotImplementException(); };

/**
 * 监听事件
 * @method addEventListener
 * @abstract 
 * @param {BridgeEventType} type 
 * @param {Function} listener 
 * @return {void} 
 */
IjsBridge.prototype.addEventListener = function (type, listener) { throw new NotImplementException(); };

/**
 * 派发事件
 * @method dispatchEvent
 * @abstract 
 * @param {BridgeEventType} type 
 * @returns {void} 
 */
IjsBridge.prototype.dispatchEvent = function (type) { throw new NotImplementException(); };

/**
 * 删除监听
 * @method removeEventListener
 * @abstract 
 * @param {BridgeEventType} type 
 * @param {Function} listener 
 * @return {void} 
 */
IjsBridge.prototype.removeEventListener = function (type, listener) { throw new NotImplementException(); };

/**
 * 
 * @param {} ajaxOptions 
 * @returns {} 
 */
IjsBridge.prototype.ajax = function (ajaxOptions) { throw new NotImplementException(); };


/**
*拍照或从手机相册中选图接口
*/
IjsBridge.prototype.chooseImage = function () { throw new NotImplementException(); };



/**
 * 扫描二维码
 * @method scan
 * @virtual
 * @param {Object} scanOptions
 * @return {void} 
 */
IjsBridge.prototype.scan = function (scanOptions) { throw new NotImplementException(); };

/**
 * 支付
 * @returns {void} 
 */
IjsBridge.prototype.pay = function (payOptions) { throw new NotImplementException(); };

/**
 * 分享
 * @param {} shareOptions 
 * @returns {void} 
 */
IjsBridge.prototype.share = function (shareOptions) { throw new NotImplementException(); };

/**
 * 设置appId appSecret
 * @method setAppOptions
 * @param {AppOptions} appOptions
 * @returns {} 
 */
IjsBridge.prototype.setAppOptions = function (appOptions) { throw new NotImplementException(); };﻿/**
 * @class ListnerItem
 * @param {BridgeEventType} type 
 * @param {Function} listener
 * @extends IjsBridge
 */
function ListenerItem(type, listener) {
    this.type = "";
    this.listener = function (event) { console.log(event); };

    if (type) this.type = type;
    if (listener) this.listener = listener;
}﻿/**
 * author : codec007
 * date   : 20160122
 * document:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model#Property_inheritance_revisited
 */


/**
 * @class AjsBridge
 * @abstract 
 * @constructor
 */
function AjsBridge() {
    IjsBridge.apply(this, arguments);
    this.appOptions = null;
    this.version = "1.2";
    this.logger = new BridgeLogger();
    this.Listeners = [];//订阅列表
}

/**
 * AlipayBridge Implement IjsBridge
 */
AjsBridge.prototype = Object.create(IjsBridge.prototype);

/**
 * @override
 * @method extend
 * @param {Object} object1,{Object} object2,...
 * @returns {Object} 
 */
AjsBridge.prototype.extend = function () {
    var o = {};
    for (var i = 0, argument; argument = arguments[i]; i++) {
        if (argument && typeof argument === "object") {
            for (var property in argument) {
                if (argument.hasOwnProperty(property)) {
                    o[property] = argument[property];
                }
            }
        }
    }
    return o;
};

/**
 * @override
 * @method addEventListener
 * @param {BridgeEventType} type 
 * @param {Function} listener 
 * @returns {void} 
 */
AjsBridge.prototype.addEventListener = function (type, listener) {
    var me = this;
    me.Listeners.push(new ListenerItem(type, listener));
};

/**
 * @override
 * @method dispatchEvent
 * @param {BridgeEventType} type 
 * @returns {void} 
 */
AjsBridge.prototype.dispatchEvent = function (type) {
    var me = this;
    me.Listeners.forEach(function (item, index, array) {
        if (item.type === type) {
            item.listener(type);
        }
    });
};

/**
 * @override
 * @method removeEventListener
 * @param {BridgeEventType} type 
 * @param {Function} listener 
 * @returns {void} 
 */
AjsBridge.prototype.removeEventListener = function (type, listener) {
    var me = this;
    me.Listeners.forEach(function (item, index, array) {
        if (item.type === type && item.listener === listener) {
            array.splice(index, 1);
        }
    });
};

/**
 * @method Ajax
 * @param {object} ajaxOptions 
 * @returns {void} 
 */
AjsBridge.prototype.ajax = function (ajaxOptions) {
    var me = this;
    var settings = me.extend(ajaxOptions, new AjaxOptions());
    try {
        var xhr = new XMLHttpRequest();
        var url = ajaxOptions.url + (settings.cache ? "" : ("&_timestamp=" + Date.now()));
        me.logger.write("ajaxUrl:" + url);
        xhr.open(settings.method, url);
        xhr.setRequestHeader("Accept", "application/json");

        //onSuccess
        xhr.addEventListener("load", function (e) {
            var text = xhr.responseText;
            if (text.indexOf("<") === 0) {
                console.log(text);
                return;
            }
            var result = JSON.parse(text);
            ajaxOptions.onSuccess(result);
        });

        //onError
        xhr.addEventListener("error", function (e) {
            console.log(e.message);
            if (ajaxOptions.onError) ajaxOptions.onError(this);
        });

        //onComplete
        xhr.addEventListener("loadend", function (e) {
            if (ajaxOptions.onComplete) ajaxOptions.onComplete(this);
        });
        xhr.send(ajaxOptions.data);
    } catch (e) {
        me.logger.write("xhr Error:" + e.message);
    }
};

/**
 * 设置app
 * @override
 * @method setAppOptions
 * @param {AppOptions}
 * @returns {void} 
 */
AjsBridge.prototype.setAppOptions = function (appOptions) {
    this.appOptions = this.extend(new AppOptions(), appOptions);
};

/**
 * 扫码设置
 * @property DefaultScanOptions 
 * @type Object
 */
AjsBridge.prototype.defaultScanOptions = {
    /**
     * 扫码类型
     * @attribute scanType
     * @type scanType
     * @default scanType.qrCode
     */
    scanType: ScanType.qrCode,
    /**
     * 
     * @attribute complete
     * @type Function
     */
    complete: function (resultStr/*扫描结果*/) { console.log(resultStr); }//扫描回调
};

/**
 * 支付设置
 * @instance
 */
AjsBridge.prototype.defaultPayOptions = {
    complete: function (result) { }
};

/**
 * 分享设置
 * @instance
 */
AjsBridge.prototype.defaultShareOptions = {
    complete: function (result) { }
};﻿/**
 * author : codec007
 * date   : 20160122
 * documents:
 */

/**
 * @class AlipayBridge
 * @extends AjsBridge
 * @constructor 
 */
function AlipayBridge() {
    AjsBridge.apply(this, arguments);
    var me = this;
    me.ContainerType = ContainerType.Alipay;
    me._listenAlipayReady();

    //load AlipayJsApi
    var script = document.createElement("script");
    script.addEventListener("load", function (e) {
        if (typeof AlipayJSBridge === "undefined") me.logger.write("not find AlipayJSBridge object!");
    });
    document.querySelector("head").insertBefore(script, null);
    script.src = ContainerBridgeConfig.alipayJsUrl;
}

/**
 * AlipayBridge inherit AjsBridge
 */
AlipayBridge.prototype = Object.create(AjsBridge.prototype);

/**
 * 监测支付宝准备完成
 * @method _listenAlipayReady
 * @private 
 * @return {void} 
 */
AlipayBridge.prototype._listenAlipayReady = function () {
    var me = this;
    document.addEventListener('AlipayJSBridgeReady', function () {
        me.dispatchEvent(BridgeEventType.ready);
    }, false);
};

/**
 * @override
 * @method scan
 * @param {Object} scanOptions 
 * @return {void} 
 * @throws {ArgumentException}
 */
AlipayBridge.prototype.scan = function (scanOptions) {
    if (!scanOptions) throw new ArgumentException("scanOptions");

    var me = this;
    var options = me.extend(me.defaultScanOptions, scanOptions);

    var alipayScanOptions = { type: 'qr' };

    switch (options.scanType) {
        case ScanType.barCode:
            alipayScanOptions.type = "bar";
            break;
        case ScanType.qrCode:
            alipayScanOptions.type = "qr";
            break;
        case ScanType.cardNumber:
            alipayScanOptions.type = "card";
            break;
    }

    AlipayJSBridge.call('scan', alipayScanOptions, function (result) {
        options.complete(result[options.scanType]); //通知用户的订阅
    });
};
﻿/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @class AndroidBridge
 * @extends AjsBridge
 * @constructor
 */
function AndroidBridge() {
    AjsBridge.apply(this, arguments);
    var me = this;
    me.ContainerType = ContainerType.Android;
    me.options = null;
    if (typeof device === "undefined") throw new Error("Not find interface");
    me._andriodReady();
}

/**
 * AndroidBridge inherit AjsBridge
 */
AndroidBridge.prototype = Object.create(AjsBridge.prototype);

/**
 * @method _andriodReady
 * @private 
 * @return {void} 
 */
AndroidBridge.prototype._andriodReady = function () {
    var me = this;
    me.dispatchEvent(BridgeEventType.ready);
};

/**
 * 设备回调
 * @method getQRcodeResult
 * @param {String} result
 * @return {void}
 */
function getQRcodeResult(result) {
    ContainerBridge.options.complete(JSON.parse(result).QRCodeResult);
};

/**
 * @override
 * @method scan
 * @param {Object} scanOptions
 * @return {void}
 * @throws {ArgumentException}
 * @throws {UnSupportedException}
 */
AndroidBridge.prototype.scan = function (scanOptions) {
    if (!scanOptions) throw new ArgumentException("options");

    var me = this;
    var options = me.extend(me.defaultScanOptions, scanOptions);

    if (options.scanType === ScanType.cardNumber) throw new UnSupportedException("cardNumber");

    me.options = options;

    device.scanQRcode();
};﻿/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @class H5Bridge
 * @extends AjsBridge
 * @constructor  
 */
function H5Bridge() {
    AjsBridge.apply(this, arguments);
    var me = this;
    me.ContainerType = ContainerType.PC;
    window.addEventListener("load", function () {
        me._h5Ready();
    });
}

/**
 * H5Bridge inherit AjsBridge
 */
H5Bridge.prototype = Object.create(AjsBridge.prototype);

/**
 * @method _iosReady
 * @private 
 * @return {void} 
 */
H5Bridge.prototype._h5Ready = function () {
    var me = this;
    me.dispatchEvent(BridgeEventType.ready);
};

/**
 * @override
 * @method scan
 * @param {Object} scanOptions
 * @return {void}
 */
H5Bridge.prototype.scan = function (scanOptions) {
    var me = this;
    var options = me.extend(me.defaultScanOptions, scanOptions);
    options.complete("Not Implement!");
};﻿/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @class IosBridge
 * @extends AlipayBridge
 * @constructor
 */
function IosBridge() {
    AjsBridge.apply(this, arguments);
    var me = this;
    me.options = null;
    this.ContainerType = ContainerType.iOS;
    window.addEventListener("load", function () {
        if (typeof JSModel === "undefined") throw new Error("Not find interface");
        me._iosReady();
    });
}

/**
 * IosBridge inherit AjsBridge
 */
IosBridge.prototype = Object.create(AjsBridge.prototype);

/**
 * @method _iosReady
 * @private 
 * @return {void} 
 */
IosBridge.prototype._iosReady = function () {
    var me = this;
    me.dispatchEvent(BridgeEventType.ready);
};

/**
 * @method onScanComplete
 * @returns {void} 
 */
function onScanComplete(result) {
    ContainerBridge.options.complete(result.qrValue);
};

/**
 * @override
 * @method scan
 * @param {Object} scanOptions
 * @return {void}
 * @throws {ArgumentException}
 * @throws {UnSupportedException}
 */
IosBridge.prototype.scan = function (scanOptions) {
    if (!scanOptions) throw new ArgumentException("options");

    var me = this;
    var options = me.extend(me.defaultScanOptions, scanOptions);

    if (options.scanType === ScanType.cardNumber) throw new UnSupportedException("cardNumber");

    me.options = options;

    JSModel.callQrReaderView();
};﻿/**
 * author : codec007
 * date   : 20160122
 * documents:
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */

/**
 * @class WechatBridge
 * @extends AjsBridge
 * @constructor 
 */
function WechatBridge() {
    AjsBridge.apply(this, arguments);
    var me = this;
    me.ContainerType = ContainerType.Wechat;
    me.appOptions = new AppOptions(ContainerBridgeConfig.wechatAppID, ContainerBridgeConfig.wechatAppSecret);

    //load WechatJsApi
    try {
        var script = document.createElement("script");
        script.addEventListener("load", function () {
            if (typeof wx === "undefined") me.logger.write("Not find wechat Inerface!");
            me._listenWechatError();
            me._onWechatReady();
            me._remoteGetConfig();
        });
        document.querySelector("head").appendChild(script);
        script.src = ContainerBridgeConfig.wechatJsUrl;
    } catch (e) {
        me.logger.write(e.message);
    }
}

//WechatBridge inherit AjsBridge
WechatBridge.prototype = Object.create(AjsBridge.prototype);

/**
 * @method _wechatReady
 * @private
 * @return {void}
 */
WechatBridge.prototype._onWechatReady = function () {
    var me = this;
    wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        me.dispatchEvent(BridgeEventType.ready);
    });
};

/**
 * @method _listenWechatError
 * @private 
 * @returns {void} 
 */
WechatBridge.prototype._listenWechatError = function () {
    var me = this;
    wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        me.logger.write(JSON.stringify(res));
    });
};

/**
 * 远程获取微信配置
 * @method _remoteGetConfig
 * @private  
 * @return {void} 
 */
WechatBridge.prototype._remoteGetConfig = function () {
    var me = this;
    me.ajax({
        url: ContainerBridgeConfig.wechatSignatureApiUrl + "?appid=" + me.appOptions.appId + "&secret=" + me.appOptions.appSecret + "&url=" + encodeURIComponent(location.href.split("#")[0]),
        method: "GET",
        onSuccess: function (result) {
            var remouteConfig = result;
            var wxConfig = {
                debug: ContainerBridgeConfig.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: remouteConfig.AppId, // 必填，公众号的唯一标识
                timestamp: remouteConfig.TimeStamp, // 必填，生成签名的时间戳
                nonceStr: remouteConfig.Noncestr, // 必填，生成签名的随机串
                signature: remouteConfig.Signature, // 必填，签名，见附录1
                jsApiList: ContainerBridgeConfig.wechatAPIList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            };
            me.logger.write(JSON.stringify(wxConfig));
            wx.config(wxConfig);
        }
    });
};

/**
 * 调用扫描
 * @override
 * @method scan 
 * @param {Object} scanOptions
 * @return {void} 
 * @throws {UnSupportedException}
 */
WechatBridge.prototype.scan = function (scanOptions) {
    var me = this;

    var options = me.extend(me.defaultScanOptions, scanOptions);

    //原始微信设置
    var wechatScanOptions = {
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            options.complete(res.resultStr);//通知用户订阅
        },
        fail: function (res) {

        },
        complete: function (res) {

        },
        cancel: function (res) {

        }

    };

    if (options.scanType === ScanType.cardNumber) throw new UnSupportedException("Wechat UnSupportedException cardNumber");
    wechatScanOptions.scanType = options.scanType;
    wx.scanQRCode(wechatScanOptions);
};

/**
 * 设置appid appsecret
 * @override
 * @param {object} appOptions 
 * @returns {} 
 */
WechatBridge.prototype.setAppOptions = function (appOptions) {
    var me = this;
    AjsBridge.prototype.setAppOptions.call(this, appOptions);
    me._remoteGetConfig();
};﻿/**
 * author : codec007
 * date   : 20170320
 * documents:
 *  https://im.icbc.com.cn/ICBCMPServer/wiki/
 *  http://u.yibalian.cn/Center/JsApiSignature?url=http%3a%2f%2fbaidu.com
 */

/**
 * @class 融e联
 * @extends AjsBridge
 * @constructor 
 */
function RelBridge() {
    AjsBridge.apply(this, arguments);
    var me = this;
    me.ContainerType = ContainerType.Rel;

    //load relJsApi
    try {
        var script = document.createElement("script");
        script.addEventListener("load", function (e) {
            me.logger.write("script loaded");
            try {
                if (typeof rel === "undefined") me.logger.write("Not find rel Inerface!");
                me._listenrelError();
                me._relReady();
                me._remoteGetConfig();
            }
            catch (e) {
                me.logger.write(e.message);
            }
        });
        document.querySelector("head").appendChild(script);
        script.src = ContainerBridgeConfig.relJsUrl;
    } catch (e) {
        me.logger.write(e.message);
    }
}

//relBridge inherit AjsBridge
RelBridge.prototype = Object.create(AjsBridge.prototype);

/**
 * @method _relReady
 * @private
 * @return {void}
 */
RelBridge.prototype._relReady = function () {
    var me = this;
    rel.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        me.dispatchEvent(BridgeEventType.ready);
    });
};

/**
 * @method _listenrelError
 * @private 
 * @returns {void} 
 */
RelBridge.prototype._listenrelError = function () {
    var me = this;
    me.logger.write("_listenrelError");
    rel.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        me.logger.write(JSON.stringify(res));
    });
};

/**
 * 远程获取微信配置
 * @method _remoteGetConfig
 * @private  
 * @return {void} 
 */
RelBridge.prototype._remoteGetConfig = function () {
    var me = this;
    me.logger.write("_remoteGetConfig");
    try {
        me.ajax({
            url: ContainerBridgeConfig.relSignatureApiUrl + "?url=" + encodeURIComponent(location.href.split("#")[0]),
            method: "GET",
            onSuccess: function (data) {
                var remouteConfig = data;
                var relConfig = {
                    debug: ContainerBridgeConfig.debug ? 1 : 0, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appid: remouteConfig.AppId,                 // 必填，公众号的唯一标识
                    timestamp: remouteConfig.TimeStamp,         // 必填，生成签名的时间戳
                    nonceStr: remouteConfig.Noncestr,           // 必填，生成签名的随机串
                    signature: remouteConfig.Signature          // 必填，签名，见附录1
                };
                me.logger.write(JSON.stringify(data));
                rel.init(relConfig);
            },
            onError: function (xhr) {
                me.logger.write("onError:" + xhr.status + xhr.responseText);
            }
        });
    } catch (e) {
        me.logger.write(e.message);
    }
};

/**
 * 调用扫描
 * @override
 * @method scan 
 * @param {Object} scanOptions
 * @return {void} 
 * @throws {UnSupportedException}
 */
RelBridge.prototype.scan = function (scanOptions) {
    var me = this;
    var options = me.extend(me.defaultScanOptions, scanOptions);
    //原始微信设置
    var relScanOptions = {
        Needdeal: "0", //0 融e联不处理，1表示处理，默认为0
        success: function (res) {
            options.complete(res.errMsg);//通知订阅用户
        }
    };

    rel.scanQRCode(relScanOptions);
};

/**
 * 分享
 * @override
 * @method share
 * @param {object} shareOptions 
 * @returns {void} 
 */
RelBridge.prototype.share = function (shareOptions) {
    var me = this;
    var options = me.extend(me.defaultScanOptions, shareOptions);
    rel.shareMenuItemsCustom({
        //showMenuList根据自定义分享传递对应的参数,如果不传则不能分享
        showMenuList: shareOptions.showMenuList,
        success: function (res) {
            options.complete(res.retMsg.result);//通知订阅用户
        }
    });
};

/**
 * 支付
 * @override
 * @method pay
 * @param {object} payOptions 
 * @returns {void} 
 */
RelBridge.prototype.pay = function (payOptions) {
    var me = this;
    rel.chooseRELPay({
        appid: "", // 必填，公众号的唯一标识    
        timestamp: "", // 必填，生成支付签名的时间戳     
        orderid: "", //必填，订单id
        totalFee: "", //必填，支付金额(分)
        nonceStr: "", // 必填，生成支付签名的随机串  
        channelAppNo: "", //非必填,渠道应用编号
        remark: "", //必填,备注信息
        signature: "", // 必填，签名,生成签名方法可以参考支付章节-附录2 jsapi支付
        success: function (res) {
            var result = res.errMsg; // 返回支付结果成功为chooseRELPay:ok	
        },
        failed: function (res) {
            me.logger.write(res.errMsg);
        },
        complete: function (res) {
            me.logger.write(res.errMsg);
        },
        cancel: function (res) {
            me.logger.write(res.errMsg);
        }
    });
};﻿/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @class H5Bridge
 * @extends AjsBridge
 * @constructor  
 */
function MobileBridge() {
    AjsBridge.apply(this, arguments);
    var me = this;
    me.ContainerType = ContainerType.Mobile;
    window.addEventListener("load", function () {
        me._MobileReady();
    });
}

/**
 * H5Bridge inherit AjsBridge
 */
MobileBridge.prototype = Object.create(AjsBridge.prototype);

/**
 * @method _iosReady
 * @private 
 * @return {void} 
 */
MobileBridge.prototype._MobileReady = function () {
    var me = this;
    me.dispatchEvent(BridgeEventType.ready);
};

/**
 * @override
 * @method scan
 * @param {Object} scanOptions
 * @return {void}
 */
MobileBridge.prototype.scan = function (scanOptions) {
    var me = this;
    var options = me.extend(me.defaultScanOptions, scanOptions);
    options.complete("Not Implement!");
};﻿/**
 * author : codec007
 * date   : 20160122
 */

/**
 * @class BridgeFactory
 */
function BridgeFactory() { }

/**
 * @function Create
 * @param {String} userAgent 
 * @returns {IjsBridge} 
 */
BridgeFactory.prototype.Create = function (userAgent) {
    var bridge;
    if (/MicroMessenger/ig.test(userAgent)) {
        bridge = new WechatBridge();
    }
    else if (/AlipayClient/ig.test(userAgent)) {
        bridge = new AlipayBridge();
    }
    else if (/AndroidShell/ig.test(userAgent)) {
        bridge = new AndroidBridge();
    }
    else if (/iOSshell/ig.test(userAgent)) {
        bridge = new IosBridge();
    }
    else if (/ICBC/ig.test(userAgent)) {
        bridge = new RelBridge();
    }
    else if (/Android/ig.test(userAgent)) {
        bridge = new MobileBridge();
    }
    else if (/iPhone|iPad|iPod/ig.test(userAgent)) {
        bridge = new MobileBridge();
    }
    else {
        bridge = new H5Bridge();
    }
    return bridge;
};

var ContainerBridge = null;
try {
    ContainerBridge = new BridgeFactory().Create(window.navigator.userAgent);
} catch (e) {
    new BridgeLogger().write(e.message);
}
