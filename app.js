const { config } = require("dotenv");
const express = require("express");
const { connect } = require("./src/db/connection");
const { urlRouter } = require("./src/urlshortener/url-shortener.route");

config();
const app = express();

app.use(express.json());
app.use(urlRouter);

// INVOKE FUNCTION IMMEDIATELY AFTER DEFINITION
(async function start () {
    await connect(process.env.MONGODB_STRING);
    app.listen(6000, function () {
    console.info("app is listening on port 6000");
  })
})();