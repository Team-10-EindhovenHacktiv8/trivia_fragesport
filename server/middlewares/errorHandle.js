function errorHandler (err, req, res, next){
    console.log(err)

    let status = 500
    let message = err.message || 'internal server error'

    if(err.name === 'SequelizeValidationError' || "SequelizeUniqueConstraintError"){
        status = 400
        console.log(err)
        message = err.errors[0].message
    }
    res.status(err.status).json({
        message
    })
}

module.exports = errorHandler