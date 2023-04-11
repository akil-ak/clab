var express = require('express');
const {join }=require("path");

var app = express();






app.listen(3000);

app.get("/", function (req, res) {
    res.sendFile(join(__dirname + "/download.html"));
});
app.get("/a", function (req, res) {
    res.sendFile(join(__dirname + "/new.html"));
});
