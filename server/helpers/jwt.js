const jwt = require('jsonwebtoken')

function generateToken(obj) {
  const token = jwt.sign(obj, process.env.SECRET)
  return token
}

function verifyToken(obj) {
  const verified = jwt.verify(token, process.env.SECRET)
  return verified
}

module.exports = {generateToken, verifyToken}