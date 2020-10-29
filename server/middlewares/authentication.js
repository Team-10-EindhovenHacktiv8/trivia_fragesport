const { User } = require('../models/index.js');
const { verifyToken } = require("../helpers/jwt.js");


function authentication(req, res, next) {
  const { token } = req.headers;
  if (!token) {
    next({ name: "UserUnauthorized" })
  } else {
    const decoded = verifyToken(token);
    User.findOne({
      where: {
        email: decoded.email
      }
    })
      .then(user => {
        if (!user) {
          next({ name: "UserUnauthorized" })
        } else {
          console.log("BERHASIL")
          req.loggedInUser = decoded
          next()
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = authentication 