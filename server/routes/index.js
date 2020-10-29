const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', (req, res) => {
    res.send("Hello world")
})

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router