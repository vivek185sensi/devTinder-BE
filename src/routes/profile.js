const express = require('express');
const profileRouter = express.Router();
const bcrypt = require('bcrypt')
const { userModal } = require('../models/userModel');
const userAuth = require('../middlewares/auth')




profileRouter.post('/addUser', async (req, res) => {
    try {

        const { name, password, confirmpassword, gender, email } = req.body

        console.log('entered profile')
        const hashed = await bcrypt.hash(password, 10)
        const matched = await bcrypt.compare(confirmpassword, hashed)
        if (!matched) {
            throw new Error('password not matched')
        }
        const user = new userModal({ name, email, password: hashed, confirmpassword: hashed, gender })
        await user.save()
        res.send("user saved successfully")
    } catch (err) {
        res.status(500).json({ message: "something went wrong", error: err.message })
    }
})

profileRouter.patch('/update/:id', userAuth, async (req, res) => {
    try {
        const allowedKeys = ['name', 'gender', 'country']
        console.log(req.body)
        const reqKeys = Object.keys(req.body)
        const isInvalid = reqKeys.some((ele) => !allowedKeys.includes(ele))
        if (isInvalid) {
            return res.status(400).send("Invalid Input")
        }
        if (req.params.id) {

            const log = await userModal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            console.log('check the status', log);
            if (!log) {
                res.status(404).send("user not found")
            } else {
                res.send('user updated  successfully');
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'something went wrong', error: error.message })
    }
})

profileRouter.get('/view', userAuth, async (req, res) => {
    try {
        const data = await userModal.findById(req.user.id)
        res.send({ status: true, data })
    } catch (err) {
        res.status(500).json({ message: 'something went wrong', error: err.message })
    }
})

profileRouter.patch('/passoword', userAuth, async (req, res) => {
    try {
        console.log('check all', req.body)
        if (req.body.password) {
            const hashed = await bcrypt.hash(password, 10)
            const data = await userModal.findByIdAndUpdate(req.user.id, {password:hashed,confirmpassword:hashed})
            console.log(data)
            res.send("password changes successfully")
        }
    } catch (err) {
        res.status(500).json({ message: 'something went wrong', error: err.message })
    }
})

profileRouter.delete('/delete', async (req, res) => {
    try {
        if (req.body.userId) {
            console.log('entered')
            const id = req.body.userId
            const log = await userModal.findByIdAndDelete(id);
            console.log('check the status', log)
            res.send('user deletd successfully');
        }
    } catch (error) {
        res.status(500).json({ message: 'something went wrong', error: error.message })
    }
})

module.exports = profileRouter 