const express = require('express');
const authRouter = express.Router();
const { userModal } = require('../models/userModel');
const userAuth = require('../middlewares/auth')


authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModal.findOne({ email })
           console.log('check the user login',req.body,user)
        if (!user) {
            res.status(404).send('User Not found');
        }
        const checkPassword = await user.passwordValidate(password)
       
        if (!checkPassword) {
            res.status(401).send("Invalid Email or Password")
        } else {
            const token = await user.getJwt()
            res.cookie('accessToken', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
            res.send("user login successfully");
        }
    } catch (err) {
        res.status(500).send('something went wrong in login ' + err)
    }
})

authRouter.post("/logout",async (req, res) => {
    res.cookie('accessToken', null, { expires: new Date(Date.now()) });
    res.send("user logout successfully");
})



module.exports = authRouter