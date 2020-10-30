const axios = require("axios")

class TenorController{
  static getExcited(req,res,next){
    axios.get(`https://api.tenor.com/v1/search?q=%22excited%22&key=FNZ6P1NRYBOC&limit=1`)
    .then(data => {
      console.log(data.data)
      res.status(200).json(data.data.results[0].media[0].tinygif.url)
    })
    .catch(err => {
      next(err)
    })
  }

  static getLose(req,res){
    axios.get(`https://api.tenor.com/v1/search?q=%22lose%22&key=FNZ6P1NRYBOC&limit=1`)
    .then(data => {
      res.status(200).json(data.data.results[0].media[0].tinygif.url)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = TenorController