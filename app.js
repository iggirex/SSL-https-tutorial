var express = require("express");
var app = express();
var fs = require("fs");

var key = fs.readFileSync("encryption/private.key");
var cert = fs.readFileSync("encryption/.mydomain.crt");
var ca = fs.readFileSync("encryption/intermediate.crt");

var options = {
    key: key,
    cert: cert,
    ca: ca
};

var https = require("https");
https.createServer(options, app).listen(443);
