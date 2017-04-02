var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});

app.use(express.static('public'));

app.get("/browsInfo", function(req, res) { //we ask app to get the thing after "/:" accessing to it as an object
    var infoObj = {};
    var h = req.headers;
    var userAgent = h["user-agent"];
    var language = h["accept-language"];
    var IP = h["x-forwarded-for"];
    //console.log(userAgent);
    //console.log(lang);
    //console.log(IP);
    var regex = /\(([^\)]+\))/g;
    var osStr = userAgent.match(regex)[0];
    var os = osStr.substring(1, osStr.length - 1);
    var lang = language.split(",")[0];
    //console.log(os);
    //console.log(lang);
    infoObj = {
        "IP adress": IP,
        "language": lang,
        "operating system": os
    };
    res.json(infoObj);
});