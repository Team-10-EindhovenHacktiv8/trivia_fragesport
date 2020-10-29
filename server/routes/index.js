const router = require('express').Router()
const userController = require('../controllers/userController')
const authentication = require("../middlewares/authentication.js")

// router.get('/', (req, res) => {
//     res.send("Hello world")
// })

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleLogin', userController.googleLogin)
router.use(authentication)

module.exports = router