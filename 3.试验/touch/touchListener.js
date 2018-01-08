/**
 * @author : ReversalMinute
 * @mail   : mailzy@vip.qq.com
 * @date   : 20180108
 * @docs   : https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
 */

/**
 * @class TouchListener
 * @returns {touch} 
 */
var TouchListener = function () {
    var me = this;
    me.touches = [];

    document.addEventListener("touchstart", function (evt) {
        evt.preventDefault();
        for (var i = 0, item; item = evt.changedTouches[i]; i++) {
            if (find(item.identifier) === null) {
                me.list.push({
                    x: item.pageX,
                    y: item.pageY,
                    identifier: item.identifier
                });
            }
        }
    });

    document.addEventListener("touchmove", function (evt) {
        evt.preventDefault();
        for (var i = 0, item; item = evt.changedTouches[i]; i++) {
            var p = find(item.identifier);
            if (p) {
                p.x = item.pageX;
                p.y = item.pageY;
            }
        }
    });

    document.addEventListener("touchend", function (evt) {
        evt.preventDefault();

        for (var i = 0, item; item = evt.changedTouches[i]; i++) {
            var storedTouch = find(item.identifier);
            if (storedTouch) {
                var idx = list.indexOf(storedTouch);
                list.splice(idx, 1);
            }
        }
    });

    document.addEventListener("touchcancel", function (evt) {
        evt.preventDefault();
        for (var i = 0, item; item = evt.changedTouches[i]; i++) {
            var storedTouch = find(item.identifier);
            if (storedTouch) {
                var idx = list.indexOf(storedTouch);
                list.splice(idx, 1);
            }
        }
    });
};


TouchListener.prototype.find = function (identifier) {
    var me = this;
    for (var i = 0, item; item = me.touches[i]; i++) {
        if (item.identifier === identifier) return item;
    }
    return null;
};