// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,               //月份   
        "d+": this.getDate(),                    //日   
        "H+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//字串转换为日期
//ConvertToDate('2012年02月14日')
//ConvertToDate('2012/02/14') 
//ConvertToDate('2012-02-14')
//ConvertToDate('20120214')
function ConvertToDate(word) {
    if (word == '') return '';
    var rex = /(\d{4}).?(\d{1,2}).?(\d{1,2}).?/.exec(word);
    var datetime = new Date(rex[1], rex[2] - 1, rex[3]);
    return datetime;
}
//数字转换为日期
//@IntTime数字
//mysql
function ConvertIntTodateTime(IntTime) {
    var times = new Date(IntTime * 1000);
    var year = times.getFullYear();
    var month = times.getMonth() + 1;
    var day = times.getDate();
    var hours = times.getHours();
    var minutes = times.getMinutes();
    var seconds = times.getSeconds();
    return ConvertToDate(year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);
}
//sql的日期json格式转换为js日期
function jsonDateToString(value) {
    if (value != null) {
        var date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
    }
    return "";
}
//将微软Json时间转化为js时间
function MSJsonDateToDate(word) {
    return new Date(parseInt(/\d+/.exec(word)));
}

function GMTStringToDate(text) {
    return new Date(text.replace(/T/.i, " "));
}

//得到日期年月日等加数字后的日期
//月(m)、日(d)、小时(h)、分(n)、秒(s)、毫秒(ms) 可以用 1-2 个占位符，
//(new Date()).AddDate('d',-1) ==> 减一天
//(new Date()).AddDate('m',3)  ==> 加三月
Date.prototype.AddDate = function (interval, number) {
    var d = this;
    var k = { 'y': 'FullYear', 'q': 'Month', 'm': 'Month', 'w': 'Date', 'd': 'Date', 'h': 'Hours', 'n': 'Minutes', 's': 'Seconds', 'ms': 'MilliSeconds' };
    var n = { 'q': 3, 'w': 7 };
    eval('d.set' + k[interval] + '(d.get' + k[interval] + '()+' + ((n[interval] || 1) * number) + ')');
    return d;
};
/* 计算两日期相差的日期年月日等 */
Date.prototype.DateDiff = function (interval, objDate2) {
    var d = this, i = {}, t = d.getTime(), t2 = objDate2.getTime();
    i['y'] = objDate2.getFullYear() - d.getFullYear();
    i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4);
    i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth();
    i['ms'] = objDate2.getTime() - d.getTime();
    i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
    i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
    i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
    i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
    i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
    return i[interval];
};

/**
 * yyyy-MM-dd 0:0:0
 * @returns {date} 
 */
Date.prototype.Start = function () {
    var nowdate = this;
    return new Date(nowdate.getFullYear(), nowdate.getMonth(), nowdate.getDate());
};
/**
 * yyyy-MM-dd 24:59:59
 * @returns {date} 
 */
Date.prototype.End = function () {
    return this.Start().AddDate("s", 86400*1000-1);
}

/************************周**************************/
//获得本周第一天
Date.prototype.ThisWeekFirstDay = function () {
    var nowdate = this;
    var weekFirstDay = new Date(nowdate - (nowdate.getDay()) * 86400000);
    return weekFirstDay;
};

//获得本周最后一天
Date.prototype.ThisWeekLastDay = function () {
    var weekFirstDay = this.ThisWeekFirstDay();
    var weekLastDay = new Date((weekFirstDay / 1000 + 6 * 86400) * 1000);
    return weekLastDay;
};

//上周第一天
Date.prototype.PreviousWeekFirstDay = function () {
    var weekFirstDay = this.ThisWeekFirstDay();
    return new Date(weekFirstDay - 86400000 * 7);
};
//上周最后一天
Date.prototype.PreviousLastWeekDay = function () {
    var weekFirstDay = this.ThisWeekFirstDay();
    return new Date(weekFirstDay - 86400000);
};

//下周第一天
Date.prototype.NextWeekFirstDay = function () {
    var monthFirstDay = this.ThisWeekLastDay();
    return new Date((monthFirstDay / 1000 + 86400) * 1000);
};
//下周最后一天
Date.prototype.NextWeekLastDay = function () {
    var monthFirstDay = this.ThisWeekLastDay();
    return new Date((monthFirstDay / 1000 + 7 * 86400) * 1000);
};
/************************月**************************/
//获得某月的天数
Date.prototype.GetMonthDays = function (myMonth) {
    var monthStartDate = new Date(this.getFullYear(), myMonth, 1);
    var monthEndDate = new Date(this.getFullYear(), myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
};
//本月第一天
Date.prototype.ThisMonthFirstDay = function () {
    var monthFirstDay = new Date(this.getFullYear(), this.getMonth(), 1);
    return monthFirstDay;
};
//本月最后一天
Date.prototype.ThisMonthLastDay = function () {
    var monthFirstDay = new Date(this.getFullYear(), this.getMonth(), 1);
    var monthLastDay = monthFirstDay.AddDate('m', 1).AddDate('d', -1);
    return monthLastDay;
};
/************************季**************************/
//获得本季度的开始月份
//javascript月份为0到11
Date.prototype.GetQuarterStartMonth = function () {
    var quarterStartMonth;
    var nowMonth = this.getMonth();
    if (nowMonth < 3) { //0,1,2
        quarterStartMonth = 0;
    } else if (nowMonth < 6) { //3,4,5
        quarterStartMonth = 3;
    } else if (nowMonth < 9) { //6,7,8
        quarterStartMonth = 6;
    } else { //9,10,11
        quarterStartMonth = 9;
    }
    return quarterStartMonth;
};
//获得本季度的开始日期
Date.prototype.ThisQuarterFirstDate = function () {
    var quarterStartDate = new Date(this.getFullYear(), this.GetQuarterStartMonth(), 1);
    return quarterStartDate;
};

//或的本季度的结束日期
Date.prototype.ThisQuarterLastDate = function () {
    var quarterEndMonth = this.GetQuarterStartMonth() + 2;
    var quarterStartDate = new Date(this.getFullYear(), quarterEndMonth, this.GetMonthDays(quarterEndMonth));
    return quarterStartDate;
};
/************************年**************************/
//本年度的开始日期
Date.prototype.ThisYearFirstDate = function () {
    var thisYearFirstDate = new Date(this.getFullYear(), 0, 1);
    return thisYearFirstDate;
};

//本年度的结束日期
Date.prototype.ThisYearLastDate = function () {
    var thisYearLastDate = new Date(this.getFullYear(), 11, 31);
    return thisYearLastDate;
};
/************************将分钟转化为天时分***************************/
ConvertMinutesToDayHourMinutes = function (minutes) {
    var day = (minutes / (60 * 24)) | 0;//|0整除
    var hour = ((minutes - (day * 60 * 24)) / 60) | 0;
    var min = (minutes - day * 60 * 24 - hour * 60) | 0;
    return day + "天," + hour + "小时," + min + "分钟";
}
Date.prototype.ThisWeekBegin = function () {
    var day = this.getDay(); // 0 周日,1 周一,6 周六
    var offset;
    if (day === 0) {
        offset = -6;
    } else {
        offset = day - 1;
    }
    var result = new Date(this);
    result.setDate(result.getDate() - offset);
    return result;
}

Date.prototype.ThisWeekEnd = function () {
    var day = this.getDay(); // 0 周日,1 周一,6 周六
    var offset;
    if (day === 0) {
        offset = 0;
    } else {
        offset = 7 - day;
    }
    var result = new Date(this);
    result.setDate(result.getDate() + offset);
    return result;
}

Date.prototype.ThisMonthBegin = function () {
    var days = this.getDate();
    var offset = days - 1;
    var result = new Date(this);
    result.setDate(result.getDate() - offset);
    return result;
}

Date.prototype.LastThreeMonthBegin = function () {
    var result = new Date(this);
    result.setMonth(result.getMonth() - 3);
    return result;
}

Date.prototype.ThisMonthEnd = function () {
    var days = this.getDate();
    var result = new Date(this);
    result.setMonth(result.getMonth() + 1);
    result.setDate(result.getDate() - days);
    return result;
}

Date.prototype.ThisYearBegin = function () {
    var result = new Date(this);
    result.setMonth(0);
    result.setDate(1);
    return result;
}