const express = require("express");
const router = express.Router();
const BotController = require("./controller");
const validator = require('../../../shared/helpers/validator');
const { LikeValidator, LikeCommentValidator } = require('./validators');
router.post("/like", validator(LikeValidator) ,BotController.like);
router.post("/like-comment", validator(LikeCommentValidator), BotController.likeComment);
router.post("/login", BotController.login);

module.exports = router;
