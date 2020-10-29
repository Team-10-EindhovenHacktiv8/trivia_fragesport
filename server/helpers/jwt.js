const jwt = require('jsonwebtoken')

function generateToken(obj) {
    const token = jwt.sign(obj, process.env.SECRET)
    return token
}

function verifyToken(token){
    const decoded = jwt.verify(token, process.env.SECRET)
    return decoded
}



module.exports = {
    generateToken,
    verifyToken
}