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
  /**
   * @param {Array<{x:number,y:number}>}  ctrlPoints
   */
  constructor(ctrlPoints = []) {
    this.ctrlPoints = ctrlPoints;
  }
  /**
   * 公式
   * @param {number} t 0-1
   */
  point(t) {
    let { ctrlPoints } = this,
      x = 0,
      y = 0,
      n = ctrlPoints.length - 1;

    ctrlPoints.forEach((item, index) => {
      if (!index) {
        x += item.x * Math.pow(1 - t, n - index) * Math.pow(t, index);
        y += item.y * Math.pow(1 - t, n - index) * Math.pow(t, index);
      } else {
        x +=
          (factorial(n) / factorial(index) / factorial(n - index)) *
          item.x *
          Math.pow(1 - t, n - index) *
          Math.pow(t, index);
        y +=
          (factorial(n) / factorial(index) / factorial(n - index)) *
          item.y *
          Math.pow(1 - t, n - index) *
          Math.pow(t, index);
      }
    });
    return {
      x,
      y
    };
  }
}
