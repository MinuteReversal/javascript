var utilitytool = {
    htmlEncode: function (value) {
        return (value + "").replace(/&/g, "&amp;")
            .replace(/"/g, '&quot;')
            .replace(/'/g, "&#39;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    },
    htmlDecode: function (value) {
        return (value + "").replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }
};

/*
*获取Url中的参数
*@param {string} 参数名字
*@return {string}
*example:
*  getQueryString("ID");
*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r =decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}