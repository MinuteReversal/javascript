var Session = getSessionObject();
function getSessionObject() {
    if (sessionStorage.getItem("Session")) {
        return JSON.parse(sessionStorage.getItem("Session"));
    } else {
        return new Object();
    }
}

if (!Session["visitHistory"]) {
    Session["visitHistory"] = [];
}

var isGoBack = false;
/**
 * @function goBack
 * @returns {void} 
 */

function goBack() {
    isGoBack = true;
    var visitHistory = Session["visitHistory"];
    if (visitHistory.length > 2) {
        visitHistory.pop();
        var previous = visitHistory[visitHistory.length - 1];
        if (previous) location.href = previous.url;
    }
}

/**
 * @function isVisited
 * @param {string} url 
 * @returns {bool} 
 */
function isVisited(url) {
    for (var i = 0, visited; visitied = Session["visitHistory"][i]; i++) {
        if (visitied.url === url) return true;
    }
    return false;
}

/**
 * @function getVisitedPath
 * @returns {string} 
 */
function getVisitedPath() {
    var path = "";
    for (var i = 0, visitied; visitied = Session["visitHistory"][i]; i++) {
        path += visitied.title + "/";
    }
    return path;
}

function popVisited(url) {
    var visitlist = Session["visitHistory"];
    for (var i = visitlist.length - 1; visitlist.length > 0; i--) {
        if (url === Session["visitHistory"][i].url) {
            break;
        }
        visitlist.pop();
    }
}

window.addEventListener("load", function (e) {
    var url = location.href;
    if (isVisited(url)) {
        popVisited(url);
    } else {
        Session["visitHistory"].push({ title: document.title, url: url });
    }
    console.log(getVisitedPath());
});

window.addEventListener("unload", function (e) {
    //页面转向的时候保存
    sessionStorage.setItem("Session", JSON.stringify(Session));
});