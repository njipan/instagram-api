const express = require("express");
const router = express.Router();
const AuthController = require("./controller");
const FilterRequest = require("../../shared/helpers/filter-request");

router.use("/:id", (req, res, next) => {
    req.onlyKeys = new FilterRequest(req).bodyOnly(["username", "password"]);
    next();
});

router.post("/signin", AuthController.signin);
router.post("/", (req, res) => {
  return res.send(403);
});

module.exports = router;
