const express = require("express");
const router = express.Router();
const { ProxyController } = require("./controller");
const { IdMiddleware } = require('../middlewares');
const { ProxyMiddleware } = require('../../shared/middlewares/proxy');

router.get("/", ProxyController.index);
router.post("/", ProxyMiddleware.check, ProxyController.store);

router.use("/:id", IdMiddleware.check);
router.get("/:id", ProxyController.show);
router.put("/:id", ProxyMiddleware.check, ProxyController.update);
router.delete("/:id", ProxyController.delete);

module.exports = router;
