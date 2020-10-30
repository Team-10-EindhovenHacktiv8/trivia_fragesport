const { User } = require('../models/')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

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
          const access_token = generateToken({ id: data.id, email: data.email, first_name: data.first_name })
          res.status(200).json({ access_token, first_name: data.first_name })
        }
      })
      .catch((err) => {
        next(err)
      })
  }

  static googleLogin(req, res, next) {
    let { google_access_token } = req.body
    const client = new OAuth2Client('73778169427-l80ckpaf02m9lofa9uat9k7sdd0dum43.apps.googleusercontent.com')
    let email = '';
    let first_name;
    let last_name;

    client.verifyIdToken({
      idToken: google_access_token,
      audience: '73778169427-l80ckpaf02m9lofa9uat9k7sdd0dum43.apps.googleusercontent.com'
    })
      .then(tiket => {
        let payload = tiket.getPayload();
        first_name = payload.given_name;
        last_name = payload.family_name;
        email = payload.email;
        return User.findOne({ where: { email: payload.email } })
      })
      .then(user => {
        if (user) {
          //gnerateToken
          return user
        } else {
          let userObj = {
            first_name,
            last_name,
            email,
            password: 'random'
          }
          return User.create(userObj)
        }
      })
      .then(dataUser => {
        let access_token = generateToken({ id: dataUser.id, email: dataUser.email })
        return res.status(200).json({access_token, first_name:dataUser.first_name})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = userController