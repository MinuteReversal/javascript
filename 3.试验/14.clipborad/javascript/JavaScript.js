/*
* author  : zhy
* version : 1
*/
var clipboard = {
    setData: function (text) {

        text = text.replace(/\r?\n/g, "\r\n");//fix windows not display new line with \r

        if (window.clipboardData) {
            window.clipboardData.setData("Text", text);
        } else {
            var textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.opacity = 0;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");
            } catch (e) {
                alert(e.message);
            } finally {
                document.body.removeChild(textarea);
            }
        }
    },
    clearData: function () {
        this.setData = "";
    }
};