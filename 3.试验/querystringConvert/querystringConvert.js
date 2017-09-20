/*
*      author:反转的分针
*    datetime:20170918
* description:序列化序列化对象为querystring
*/
var querystringConvert = {
    getQueryStringFromArray: function (a) {
        var queryString = [];
        for (var i = 0, item; item = a[i]; i++) {
            var qs = "";
            if (typeof item === "string") {
                qs = i + "=" + item;
            }
            else if (item.name && item.value) {
                qs = item.name + "=" + (item.value ? item.value : "");
            }
            queryString.push(qs);
        }
        return queryString;
    },
    getQueryStringFromObject: function (o, level, memberName) {
        var me = this;
        var queryString = [];
        if (typeof o === "string") {
            return [memberName + "=" + o];
        }

        for (var p in o) {
            var m = p;//成员名称

            if (level > 0) {
                m = memberName + "[" + p + "]";
            }

            // 遍历数组
            if (o[p] instanceof Array) {
                for (var i = 0, item; item = o[p][i]; i++) {
                    queryString = queryString.concat(me.getQueryStringFromObject(item, level + 1, m + "[" + i + "]"));
                }
            }
            // 遍历对象成员
            else if (typeof o[p] === "object" && o[p] !== null) {
                queryString = queryString.concat(me.getQueryStringFromObject(o[p], level + 1, m));
            }
            // 基本类型赋值
            else {
                queryString = queryString.concat(encodeURIComponent(m) + "=" + (o[p] === null ? "" : encodeURIComponent(o[p])));
            }
        }
        return queryString;
    },
    /*
     *@method:serializeObject
     *@description:将对象序列化为queryString
     */
    serializeObject: function (object) {
        var me = this;
        var o = object;
        var queryString = [];

        if (o instanceof Array) {
            queryString = me.getQueryStringFromArray(o);
        }
        else if (typeof o === "object") {
            queryString = me.getQueryStringFromObject(o, 0, "");
        }

        return queryString.join("&");
    },
    isArray: function (text) {
        var kvs = text.split("&");
        var result = false;

        for (var i = 0; i < kvs.length && kvs.length > 2; i++) {
            var current = kvs[i];
            var next = kvs[i + 1];
            var currentKey = current.split("=")[0];

            if (/^\d+$/.test(currentKey)){
                result = true; 
            }
            else if (next) {
                var nextKey = next.split("=")[0];
                //相同或都是数字
                result = (currentKey === nextKey);
            }

            if (!result) break;
        }
        return result;
    },
    getArrayFromQueryString: function (qs) {
        var a = [];
        var kvs = qs.split("&");
        for (var i = 0, kv; kv = kvs[i]; i++) {
            var keyvalue = kv.split("=");
            var key = keyvalue[0];
            var value = keyvalue[1];
            if (/^\d+$/.test(key)) {
                a.push(value);
            }
            else if (key && value) {
                a.push({ name: key, value: value });
            }
        }
        return a;
    },
    getObjectFromQueryStirng: function (qs) {
        var me = this;
        var o = {};
        for (var i = 0, item; item = qs[i]; i++) {
            me.resolveQueryString(o, item);
        }
        return o;
    },
    resolveQueryString: function (o, qs) {
        var me = this;
        var r = qs.split("=");
        var p = r[0];//property 
        var v = r[1];//value
        var memberRegex = /(?=\[)?(\w+)(?=\])?/ig;
        me.addMemberToObject(o, p.match(memberRegex), v);
    },
    addMemberToObject: function (o, memberNameCollection, value) {
        var me = this;
        var memberName = memberNameCollection.shift();
        var childObjectMember = memberNameCollection[0];

        if (value === "undefined") value = null;

        //child is array
        if (childObjectMember && /^\d+$/.test(childObjectMember)) {
            var m = o[memberName];

            if (typeof m === "undefined") {
                o[memberName] = [];
            }

            if (memberNameCollection.length) {
                me.addMemberToObject(o[memberName], memberNameCollection, value);
            }
            else {
                o[memberName].push(value);
            }
        }
        //child is object
        else if (childObjectMember) {
            var m = o[memberName];
            if (typeof m === "undefined") {
                o[memberName] = {};
            }

            if (memberNameCollection.length) {
                me.addMemberToObject(o[memberName], memberNameCollection, value);
            }
            else {
                o[memberName] = value;
            }
        }
        // normal value
        else {
            o[memberName] = value;
        }
    },
    /*
    *@method:deserializeObject
    *@description:将queryString反序列化为对象
    */
    deserializeObject: function (queryString) {
        var me = this;
        var o = null;
        var qs = decodeURIComponent(queryString);
        if (qs === "") { return o; }
        else if (me.isArray(qs)) {
            o = me.getArrayFromQueryString(qs);
        }
        else {
            o = me.getObjectFromQueryStirng(qs.split('&'));
        }
        return o;
    }
};