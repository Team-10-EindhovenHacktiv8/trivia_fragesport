const router = require("express").Router()
const ControllerTrivia = require('../controllers/triviaController')

router.post('/trivia', ControllerTrivia.showQuestion)
router.get('/categories', ControllerTrivia.getCategory)

module.exports = router