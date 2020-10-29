const axios = require('axios')
class ControllerTrivia {

  static showQuestion(req, res,next) {
    const idCategory = +req.body.idCategory
    const amountQuestion = +req.body.amountQuestion
    const difficulty = req.body.difficulty
    
    axios.get(`https://opentdb.com/api.php?amount=${amountQuestion}&category=${idCategory}&difficulty=${difficulty}&type=multiple`)
      .then(data => {
        res.status(200).json(data.data.results)
      })
      .catch(err => {
        next(err)
      })
  }

  static getCategory(req, res, next){
    axios.get('https://opentdb.com/api_category.php')
    .then(data => {
      res.status(200).json(data.data.trivia_categories)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = ControllerTrivia