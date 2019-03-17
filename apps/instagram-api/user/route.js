const express = require("express");
const router = express.Router();
const UserController = require("./controller");
const FilterRequest = require("../../shared/helpers/filter-request");

router.get("/", UserController.index);
router.post("/", UserController.store);

router.use("/:id", (req, res, next) => {
    const id = req.params.id || "";
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        data: null
      });
    }
    req.id = id;
    req.onlyKeys = new FilterRequest(req).bodyOnly(["username", "email"]);

    next();
});
router.get("/:id", UserController.show);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
