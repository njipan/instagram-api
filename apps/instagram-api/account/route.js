const express = require('express'), router = express.Router();
const { IdMiddleware } = require('../middlewares');
const { AccountController } = require('./controller');
const {AccountMiddleware} = require('../../shared/middlewares/account');

router.get('/', AccountController.index);
router.post('/', AccountMiddleware.check ,AccountController.store);

router.use('/:id', IdMiddleware.check);
router.get('/:id', AccountController.show);
router.put('/:id', AccountMiddleware.check ,AccountController.update);
router.delete('/:id', AccountController.delete);

module.exports = router;