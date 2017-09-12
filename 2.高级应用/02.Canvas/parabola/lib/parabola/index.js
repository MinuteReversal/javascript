; (function (window) {
    /**
    * author : zhy
    * date   : 20170607
    */

    /**
    * constructor
    * @param {object} options
    */
    var Parabola = function (options) {
        var me = this;
        me.lastTime = 0;
        me.isStop = false;
        me.setOptions(options);
    };

    Parabola.prototype.setOptions = function (options) {
        var me = this,
            settings = Object.assign({}, me.defaultOptions, options);
        me.a = settings.a;
        me.duration = settings.duration;
        me.onFrame = settings.onFrame;
        me.onComplete = settings.onComplete;
        me.setPoint(settings.startPoint, settings.endPoint);
    };

    Parabola.prototype.setPoint = function (startPoint, endPoint) {
        var me = this;
        me.startPoint = startPoint;
        me.endPoint = endPoint;
        me.width = Math.abs(me.startPoint.x - me.endPoint.x);
        me.height = Math.abs(me.startPoint.y - me.endPoint.y);

        if (me.startPoint.x < me.endPoint.x) {
            me.stb = true;  //small to big
            me._currentX = 0;
        }
        else {
            me.stb = false;  //big to small
            me._currentX = me.width;
        }
        me.parameters = me.getParameter(me.startPoint, me.endPoint);
        me.speed = me.width / me.duration;
    };

    Parabola.prototype.getParameter = function (startPoint, endPoint) {
        var me = this;
        var x1 = 0;//移动到原点
        var y1 = 0;//移动到原点
        var x2 = me.width;//整体移动
        var y2 = me.height;//整体移动
        var a = this.a;

        return {
            a: a,
            b: (y2 - a * Math.pow(x2, 2) - y1 + a * Math.pow(x1, 2)) / (x2 - x1),
            c: (y1 - a * Math.pow(x1, 2) - y2 * x1 / x2 - a * x2 * x1) / (1 + x1 / x2)
        };
    };

    Parabola.prototype.getY = function (x) {
        var me = this,
            p = me.parameters;
        a = p.a;
        b = p.b;
        c = p.c;

        return a * Math.pow(x, 2) + b * x + c;
    };

    Parabola.prototype.play = function () {
        var me = this;
        me.isStop = false;
        me.lastTime = Date.now();
        var fnltr = function () {
            var now = Date.now();
            var elapsed = now - me.lastTime;
            me.lastTime = now;


            if (me.isStop) return;

            if (me.stb) {
                if (me._currentX <= me.width) {
                    var x = me._currentX;
                    var y = me.getY(x); //获得当前坐标

                    me.onFrame({
                        x: x + me.startPoint.x,
                        y: y + me.startPoint.y
                    });
                    me._currentX += elapsed * me.speed;
                    window.requestAnimationFrame(fnltr);
                }
                else {
                    me.onFrame(me.endPoint);
                    me.onComplete(me.endPoint);
                }
            }
            else {
                if (me._currentX >= 0) {
                    var x = me.width - me._currentX;;
                    var y = me.getY(x); //获得当前坐标

                    me.onFrame({
                        x: me.width - x + me.endPoint.x,
                        y: y + me.endPoint.y - me.height
                    });
                    me._currentX -= elapsed * me.speed;
                    window.requestAnimationFrame(fnltr);
                }
                else {
                    me.onFrame(me.endPoint);
                    me.onComplete(me.endPoint);
                }
            }
        }
        window.requestAnimationFrame(fnltr);
    };

    Parabola.prototype.stop = function () {
        var me = this;
        me.isStop = true;
    };

    Parabola.prototype.reset = function () {
        var me = this;

    }

    Parabola.prototype.defaultOptions = {
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 0, y: 0 },
        duration: 1000,
        a: 0.004,
        onFrame: function (currentPoint) { },
        onComplete: function () { }
    };

    window.Parabola = Parabola;
})(window);