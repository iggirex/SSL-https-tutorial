const express = require("express");
const app = express();

// app.get("/health-check", (req, res) => res.sendStatus(200));

app.use(express.static("static"));

app.listen(8080);
