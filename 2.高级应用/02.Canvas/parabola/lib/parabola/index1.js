; (function (window) {
    /**
    * author : zhy
    * date   : 20170606
    */

    /**
    * constructor
    * @param {object} options
    */
    var Parabola = function (options) {
        var me = this,
            settings = Object.assign({}, me.defaultOptions, options);

        me.startPoint = settings.startPoint;
        me.endPoint = settings.endPoint;
        me.a = settings.a;
        me.speed = settings.speed;
        me.isStop = false;
        me.parameters = me.getParameter(me.startPoint, me.endPoint);
        me.onFrame = settings.onFrame;
        me.onComplete = settings.onComplete;
        me._currentX = Math.abs(p1.x - p2.x);
    };

    Parabola.prototype.getParameter = function (startPoint, endPoint) {
        var x1 = 0;//移动到原点
        var y1 = 0;//移动到原点
        var x2 = Math.abs(endPoint.x - startPoint.x);//整体移动
        var y2 = Math.abs(endPoint.y - startPoint.y);//整体移动
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
        var fnltr = function () {
            if (me._currentX >=0) {
                var y = me.getY(me._currentX); //获得当前坐标
                me.onFrame({
                    x: me._currentX + p1.x, 
                    y: y + p1.y
                });
                me._currentX--;
                if (!me.isStop) window.requestAnimationFrame(fnltr);
            }
            else {
                me.onComplete();
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
        me._currentX = me.startPoint.x;
    }

    Parabola.prototype.defaultOptions = {
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 0, y: 0 },
        speed: 1000,
        a: 0.004,
        onFrame: function (currentPoint) { },
        onComplete: function () { }
    };

    window.Parabola = Parabola;
})(window);