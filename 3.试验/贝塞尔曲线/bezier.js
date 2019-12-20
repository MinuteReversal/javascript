/**
 * 递归阶乘
 * @param {number} num
 */
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

/**
 * 贝塞尔
 */
class Bezier {
    controlPoints = [];
    /**
     * @param {Array<{x:number,y:number}>} controlPoints
     */
    constructor(controlPoints = []) {
        this.controlPoints = controlPoints;
    }
    /**
     * 公式
     * @param {number} percent 0-1
     */
    point(percent) {
        let { controlPoints } = this,
            x = 0,
            y = 0,
            n = controlPoints.length - 1;

        controlPoints.forEach((item, index) => {
            if (!index) {
                x +=
                    item.x *
                    Math.pow(1 - percent, n - index) *
                    Math.pow(percent, index);
                y +=
                    item.y *
                    Math.pow(1 - percent, n - index) *
                    Math.pow(percent, index);
            } else {
                x +=
                    (factorial(n) / factorial(index) / factorial(n - index)) *
                    item.x *
                    Math.pow(1 - percent, n - index) *
                    Math.pow(percent, index);
                y +=
                    (factorial(n) / factorial(index) / factorial(n - index)) *
                    item.y *
                    Math.pow(1 - percent, n - index) *
                    Math.pow(percent, index);
            }
        });
        return {
            x,
            y
        };
    }
}
