const express = require("express");
const router = express.Router();
const BotController = require("./controller");
const validator = require('../../../shared/helpers/validator');
const { LikeValidator } = require('./validators');
router.post("/like", validator(LikeValidator) ,BotController.like);

module.exports = router;
