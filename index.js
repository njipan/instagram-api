require("dotenv").load();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { requestOnly } = require('./shared/middlewares/request');
const { statusResponse } = require('./shared/middlewares/response');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(requestOnly());
app.use(statusResponse());
app.use("/", require('./routes'));

app.listen(process.env.PORT || 3000, () => {
  console.log("Started on port 80");
});