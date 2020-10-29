const router = require('express').Router();
const salutController = require('../controller/salutController')

router.get('/salut', salutController.getRandomSalut);

module.exports = router;