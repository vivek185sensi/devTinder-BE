const jwt = require('jsonwebtoken');
require('dotenv').config()
const userAuth = (req, res, next) => {
    try {
        const { accessToken } = req.cookies
        const authentication = jwt.verify(accessToken, process.env.SECRET_KEY)
        if (!authentication) {
            res.status(401).send('User not found')
        } 
        req.user=authentication
            next();
    
    } catch (err) {
        return res.status(401).json('Invalid or expired token')
    }
}


module.exports =  userAuth 