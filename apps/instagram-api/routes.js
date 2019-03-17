const express = require("express");
const router = express.Router();
const AuthMiddleware = require("./middlewares/auth.middleware");

router.use("/auth", require("./auth/route"));
router.use(AuthMiddleware.check);
router.use("/accounts", require("./account/route"));
router.use("/proxies", require("./proxy/route"));
router.use("/users", require("./user/route"));

module.exports = router;
