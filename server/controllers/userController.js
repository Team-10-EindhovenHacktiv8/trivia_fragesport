const { User } = require('../models/')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class userController {
  static register(req, res, next) {
    const userBody = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    }
    User.create(userBody)
      .then(({ id, email, first_name, last_name }) => {
        res.status(201).json({ id, email, first_name, last_name })
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const user = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: user.email
      }
    })
      .then(data => {
        if (!data) {
          throw { name: "WrongEmailPassword" }
        } else if (!comparePassword(user.password, data.password)) {
          throw { name: "WrongEmailPassword" }
        } else if (data && comparePassword(user.password, data.password)) {
          const access_token = generateToken({ id: data.id, email: data.email })
          res.status(200).json({ access_token })
        }
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = userController