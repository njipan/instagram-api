const express = require('express'), router = express.Router();
const { INSTAGRAM_API_ROUTES, BOT_API_ROUTES } = require("./apps/routes");
router.use('/v1', INSTAGRAM_API_ROUTES);
router.use('/v1', BOT_API_ROUTES);

module.exports = router;