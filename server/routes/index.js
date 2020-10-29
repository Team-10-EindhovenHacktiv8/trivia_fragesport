const router = require('express').Router()
const userController = require('../controllers/userController')
const authentication = require("../middlewares/authentication.js")

router.post('/register', userController.register)
router.post('/login', userController.login)
router.use(authentication)

module.exports = router

