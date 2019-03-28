const express = require("express");
const router = express.Router();
const authMiddleware = require("../shared/middlewares/auth");

router.use(authMiddleware.check);
router.use("/execute-bots", require("./modules/execute-bot/routes"));

module.exports = router;
