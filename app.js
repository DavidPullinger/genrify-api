// external module imports
const express = require("express");
const request = require("request");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
// class imports
const spotify = require("./controllers/spotify");
// initialize server
let app = express();
app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());
// routes
app.get("/", (req, res) => res.send("GENRIFY SERVER"));
app.get("/login", (req, res) => spotify.login(req, res, querystring));
app.get("/callback", (req, res) =>
  spotify.callback(req, res, querystring, request)
);
app.get("/refresh_token", (req, res) =>
  spotify.refresh_token(req, res, request)
);
app.listen(3000, () => console.log(`Listening on PORT ${3000}`));
