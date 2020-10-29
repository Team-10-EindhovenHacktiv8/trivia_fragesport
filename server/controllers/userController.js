const { User } = require('../models/')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class userController {
    static register(req, res) {
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
            .catch((err) => {
                if (err.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
                    res.status(400).json(err.errors)
                } else {
                    res.status(500).json({ message: err })
                }
            })
    }

    static login(req, res) {
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
                if (!user) {
                    res.status(401).json({
                        message: 'wrong email/password'
                    })
                } else if (!comparePassword(playload.password, user.password)) {
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
}

module.exports = userController