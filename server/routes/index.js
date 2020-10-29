const router = require('express').Router()
const screenshotController = require('../controllers/screenshotController')

router.post('/screenshot', screenshotController.take)

module.exports = router