//表示全局唯一标识符 (GUID)。
function Guid(input) {
    var array32 = new Array(); //存放32位数值的数组
    if (typeof (input) === "string") { //如果构造函数的参数为字符串
        initByString(array32, input);
    }
    else {
        initByOther(array32);
    }
    //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。
    this.Equals = function (o) {
        if (o && o.IsGuid) {
            return this.ToString() == o.ToString();
        } else {
            return false;
        }
    };
    //Guid对象的标记
    this.isGuid = function () { };
    //返回 Guid 类的此实例值的 String 表示形式。
    this.toString = function (format) {
        if (typeof (format) == "string") {
            if (format == "N" || format == "D" || format == "B" || format == "P") {
                return toStringWithFormat(array32, format);
            } else {
                return toStringWithFormat(array32, "D");
            }
        } else {
            return toStringWithFormat(array32, "D");
        }
    };

    //由字符串加载
    function initByString(arr, g) {
        g = g.replace(/\{|\(|\)|\}|-/g, "");
        g = g.toLowerCase();
        if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1) {
            initByOther(arr);
        }
        else {
            for (var i = 0; i < g.length; i++) {
                arr.push(g[i]);
            }
        }
    }
    //由其他类型加载
    function initByOther(arr) {
        var i = 32;
        while (i--) {
            arr.push("0");
        }
    }

    /*
    根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。
    N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx 
    B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx} 
    P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx) 
    */
    function toStringWithFormat(arr, format) {
        switch (format) {
            case "N":
                return arr.toString().replace(/,/g, "");
            case "D":
                var strD = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20, 32);
                strD = strD.replace(/,/g, "");
                return strD;
            case "B":
                var strB = toStringWithFormat(arr, "D");
                strB = "{" + strB + "}";
                return strB;
            case "P":
                var strP = toStringWithFormat(arr, "D");
                strP = "(" + strP + ")";
                return strP;
            default:
                return new Guid();
        }
    }
}
//Guid 类的默认实例，其值保证均为零
Guid.empty = new Guid();
//初始化 Guid 类的一个新实例。
Guid.newGuid = function () {
    var g = "";
    var i = 32;
    while (i--) {
        g += Math.floor(Math.random() * 16.0).toString(16);
    }
    return new Guid(g);
};