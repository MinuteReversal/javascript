<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="email=no" />
    <meta name="viewport" content="width=device-width,user-scalable=no" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <title></title>
</head>
<body>
    <%foreach (var fileName in System.IO.Directory.GetFiles(HttpContext.Current.Server.MapPath(".")))
        { %>
    <%if (System.IO.Path.GetExtension(fileName) == ".html")
        {
            var f = System.IO.Path.GetFileName(fileName);
    %>
    <div>
        <a href="<%=f%>?_g=<%=Guid.NewGuid()%>"><%=f%></a>
    </div>
    <%}%>
    <%}%>
</body>
</html>
