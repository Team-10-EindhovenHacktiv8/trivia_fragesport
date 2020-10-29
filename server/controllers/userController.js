const { User } = require('../models/')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class userController {
    static register(req,res,next) {
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
                // if (err.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
                //     res.status(400).json(err.errors)
                // } else {
                //     res.status(500).json({ message: err })
                // }
                next(err)
            })
    }

    static login(req,res,next) {
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
                    res.status(401).json({
                        message: 'wrong email/password'
                    })
                } else if (!comparePassword(user.password, data.password)) {
                    res.status(401).json({
                        message: 'wrong email/password'
                    })

                } else if (data && comparePassword(user.password, data.password)) {
                    const access_token = generateToken({ id: data.id, email: data.email })
                    res.status(200).json({ access_token })
                } 
            })
            .catch((err) => {
                // if (err.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
                //     res.status(400).json(err)
                // } else {
                //     res.status(500).json({ message: err })
                // }
                next(err)
            })
    }
    static googleLogin(req, res, next ){
        let {google_access_token} = req.body
        console.log('msuk', google_access_token)
        const client = new OAuth2Client('73778169427-l80ckpaf02m9lofa9uat9k7sdd0dum43.apps.googleusercontent.com')
        let email = ''


        client.verifyIdToken({
            idToken: google_access_token,
            audience: '73778169427-l80ckpaf02m9lofa9uat9k7sdd0dum43.apps.googleusercontent.com'
        })
        .then( tiket => {
            let payload = tiket.getPayload()
            email = payload.email 
            return User.findOne({where: {email: payload.email}}) 
        })
        .then(user => {
            if(user){
                //gnerateToken
                return user 
            } else {
                var userObj = {
                    email,
                    password: ''
                }
                return User.create(userObj)
            }
        })
        .then(dataUser => {
            let access_token = generateToken({id: dataUser.id, email:dataUser.email })
            return res.status(200).json(access_token)
        })
        .catch( err => {
            console.log(err )
        })
    
    }
}

module.exports = userController