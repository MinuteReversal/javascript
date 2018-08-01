/*
* author  : zhy
* version : 1.3 
*/
/**
 * @method download
 * @param {String} url
 * @param {Object} body
 * @param {String} fileName
 * @param {Function} fnProgress
 * @param {Function} fnSuccess
 * @param {Function} fnError
 */
function download(url, headers, body, method, fileName, fnProgress, fnSuccess, fnError) {
    var settings = {
        url: "",
        headers: [{ header: "Content-Type", value: "application/json" }],
        body: null,
        method: "GET",
        fileName: "",
        fnProgress: function (e) { },
        fuSuccess: function (e) { },
        fnError: function (e) { },
        mimeType: {
            "image/bmp": "bmp",
            "image/svg+xml": "svg",
            "image/gif": "gif",
            "image/png": "png",
            "image/jpeg": "jpg",
            "image/x-icon": "ico",
            "text/plain": "txt",
            "text/html": "html",
            "text/css": "css",
            "text/xml": "xml",
            "audio/mp3": "mp3",
            "video/mp4": "mp4",
            "application/javascript": "js",
            "application/json": "json",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
            "application/msword": "doc",
            "application/vnd.ms-excel": "xls",
            "application/vnd.ms-powerpoint": "ppt",
            "application/x-zip-compressed": "zip",
            "application/zip": "zip"
        }
    };

    if (url !== "") {
        settings.url = url;
    }

    if (headers) {
        settings.headers = headers;
    }

    if (body) {
        settings.body = body;
    }

    if (method) {
        settings.method = method;
    }

    if (fileName) {
        settings.fileName = fileName;
    }

    if (fnProgress && typeof fnProgress === "function") {
        settings.fnProgress = fnProgress;
    }

    if (fnSuccess) {
        settings.fnSuccess = fnSuccess;
    }

    if (fnError) {
        settings.fnError = fnError;
    }

    if (typeof arguments[0] === "object") {
        var o = arguments[0];
        for (var p in o) {
            settings[p] = o[p];
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function (e) {
        var me = e.target;
        if (me.status === 200) {
            var name = settings.fileName;

            //把路径的最后一级做为文件名称
            if (name === "") {
                name = decodeURIComponent(settings.url).split("/").pop();
            }

            if (name.indexOf(".") === -1) {
                var contentType = me.getResponseHeader("Content-Type");
                var extension = settings.mimeType[contentType];
                name = name.concat(".", extension);
            }

            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(me.response, name);
            } else {
                var anchor = document.createElement("a");
                anchor.href = URL.createObjectURL(me.response);
                anchor.setAttribute("download", name);
                anchor.text = "下载";
                anchor.style.visibility = "hidden";
                anchor.addEventListener("load", function (loadEvent) {
                    loadEvent.stopPropagation();
                });

                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
                settings.fuSuccess(me);
            }
        }
        else {
            if (settings.fnError(me));
        }
    });
    xhr.addEventListener("progress", function (e) {
        settings.fnProgress(e);
    });
    xhr.addEventListener("error", function (e) {
        settings.fnError(e);
    });
    xhr.open(settings.method, settings.url);
    for (var i = 0, item; item = settings.headers[i]; i++) {
        xhr.setRequestHeader(item.header, item.value);
    }
    xhr.responseType = "blob";
    xhr.send(settings.postData ? JSON.stringify(settings.postData) : settings.postData);
}