const fs=require('fs')

const userAuth = (req, res, next) => {
    const token = 'xyz'
    console.log('vivek req', req.body)
    const authentication = "xyz" === token;
    if (!authentication) {
        res.status(401).send('User not found')
    } else {
        next()
    }
}

const adminAuth = (req, res, next) => {
    const token = 'xyz'
    console.log('vivek req', req.body)
    const authentication = "xyz" === token;
    if (!authentication) {
        res.status(401).send('User not found')
    } else {
        next()
    }
}

module.exports = { userAuth,adminAuth }