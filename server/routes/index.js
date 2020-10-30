const router = require('express').Router();
const userController = require('../controllers/userController');
const salutController = require('../controllers/salutController');
const authentication = require("../middlewares/authentication.js");
const ControllerTrivia = require('../controllers/triviaController')

router.get('/salut', salutController.getRandomSalut);
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleLogin', userController.googleLogin)
router.use(authentication)

router.post('/trivia', ControllerTrivia.showQuestion)
router.get('/categories', ControllerTrivia.getCategory)

module.exports = router;
