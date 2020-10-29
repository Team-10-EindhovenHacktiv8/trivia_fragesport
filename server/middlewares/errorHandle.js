function errorHandler (err, req, res, next){
    let status = 500
    let message = err.message || 'internal server error'

    if(err.errors[0] === "ValidationErrorItem"){
        status = 400
        message = err.errors[0].message
    }
    res.status(status).json({
        message
    })
}

module.exports = errorHandler