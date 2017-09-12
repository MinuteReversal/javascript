/**
 * @author      : zhy
 * @description : 文本文件下载
 * @time        : 2017-08-17
 * @example 
 *  new TextFile("hello","掌柜帮.url").Download();
 */

/**
 * @class TextFile
 * @param {string|blob} text 
 * @param {string} filename 
 * @constructor 
 */
function TextFile(text, filename) {
    this.text = "";
    this.filename = "1.txt";
    this.blob = null;

    if (filename) {
        this.filename = filename;
    }

    if (typeof text === "string") {
        this.text = text;
        this._TextToBlob();
    }
    else if (text instanceof Blob) {
        this.blob = text;
    }
}

/**
 * @private 
 * @method _TextToBlob
 * @returns {void} 
 */
TextFile.prototype._TextToBlob = function () {
    this.blob = new Blob([this.text], { type: "text/plain" });
};

/**
 * @public 
 * @method getBlob 
 * @returns {Blob} 
 */
TextFile.prototype.getBlob = function () {
    return this.blob;
};

/**
 * @public 
 * @method Download
 * @returns {void} 
 */
TextFile.prototype.Download = function () {
    var blob = this.blob;
    if (typeof navigator.msSaveBlob === "function") {
        navigator.msSaveBlob(blob, this.filename);
    } else {
        var anchor = document.createElement("a");
        var url = URL.createObjectURL(blob);
        anchor.href = url;
        anchor.setAttribute("download", this.filename);
        anchor.text = "下载";
        anchor.style.visibility = "hidden";

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }
};
