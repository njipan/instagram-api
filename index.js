global.__process_path = __dirname;
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

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Started on port " + server.address().port);
});
const io = require('socket.io')(server);
require('./socket')(io);
