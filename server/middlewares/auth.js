const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.headers.authorizations) {
        const token = req.headers.authorizations.split(' ')[1]

        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                next(error)
            } else {
                req.user = decoded
                next()
            }
        })
    } else {
        next(Error("No Token Provided"))
    }
}