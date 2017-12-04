/**
 * @author : ReversalMinute
 * @mail   : mailzy@vip.qq.com
 * @date   : 2017-11-24
 * @docs   : https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
 */

/**
 * @class TouchLisener
 * @returns {touch} 
 */
function TouchLisener() {
    var me = this;
    me.mouse = {
        Left: false,
        LeftDownPosition: { X: 0, Y: 0 },
        Middle: false,
        MiddleDownPosition: { X: 0, Y: 0 },
        Right: false,
        RightDownPosition: { X: 0, Y: 0 },
        Wheel: 0,
        X: 0,
        Y: 0
    };

    window.addEventListener("mousedown", function (mouseEvent) {
        mouseEvent.preventDefault();
        me.setMouseStatus(mouseEvent, true);
    });
    window.addEventListener("mouseup", function (mouseEvent) {
        mouseEvent.preventDefault();
        me.setMouseStatus(mouseEvent, false);
    });
    window.addEventListener("mousemove", function (mouseEvent) {
        mouseEvent.preventDefault();
        me.mouse.X = mouseEvent.clientX;
        me.mouse.Y = mouseEvent.clientY;
    });
    window.addEventListener("mousewheel", function (mouseEvent) {
        mouseEvent.preventDefault();
        me.mouse.Wheel += mouseEvent.wheelDelta;
    });
    return me.mouse;
}

TouchLisener.prototype.setMouseStatus = function (mouseEvent, isButtonDown) {
    var me = this;
    var mouse = me.mouse;
    switch (mouseEvent.which) {
        case 1:
            mouse.Left = isButtonDown;
            if (mouse.Left) {
                mouse.LeftDownPosition.X = mouseEvent.clientX;
                mouse.LeftDownPosition.Y = mouseEvent.clientY;
            }
            else {
                mouse.LeftDownPosition.X = 0;
                mouse.LeftDownPosition.Y = 0;
            }
            break;
        case 2:
            mouse.Middle = isButtonDown;
            if (mouse.Middle) {
                mouse.MiddleDownPosition.X = mouseEvent.clientX;
                mouse.MiddleDownPosition.Y = mouseEvent.clientY;
            }
            else {
                mouse.MiddleDownPosition.X = 0;
                mouse.MiddleDownPosition.Y = 0;
            }
            break;
        case 3:
            mouse.Right = isButtonDown;
            if (mouse.Right) {
                mouse.RightDownPosition.X = mouseEvent.clientX;
                mouse.RightDownPosition.Y = mouseEvent.clientY;
            }
            else {
                mouse.RightDownPosition.X = 0;
                mouse.RightDownPosition.Y = 0;
            }
            break;
        default:
    }
};