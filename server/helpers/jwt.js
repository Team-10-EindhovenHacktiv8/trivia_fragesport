const jwt = require('jsonwebtoken')

function generateToken(obj) {
    const token = jwt.sign(obj, process.env.SECRET)
    return token
}

module.exports = generateToken