const fetch = require('node-fetch')

class Controller {
  static getRandomSalut(req, res, next) {
    let lang = ["ar", "az", "be", "bg", "bn", "bs", "cs", "da", 'de', 'dz', 'el', 'en', 'en-gb', 'en-us', 'es', 'et', 'fa', 'fi', 'fil', 'fr', 'he', 'hi', 'hr', 'hu', 'hy', 'id', 'is', 'it', 'ja', 'ka', 'kk', 'km', 'ko', 'lb', 'lo', 'lt', 'lv', 'mk', 'mn', 'ms', 'my', 'ne', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sq', 'sr', "sv", "sw", "th", "tk", "uk", "vi", "zh"];
    fetch('https://fourtonfish.com/hellosalut/?lang='+lang[Math.floor(Math.random()*58)])
    .then(response => {
      return response.json()
    })
    .then(jsonData => {
      res.status(200).json(jsonData)
      console.log( jsonData ) 
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = Controller