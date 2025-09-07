const express = require('express');
const { userAuth, adminAuth } = require('./middlewares/auth');
const { db } = require('./config/database');
const userModal = require('./models/userModel').default.default;
const app = express()

app.use(express.json())

app.patch('/update', async (req, res) => {
    try {
        if (req.body.userId) {
            console.log('entered')
            const id = req.body.userId
            const log = await userModal.findByIdAndUpdate(id, req.body);
            console.log('check the status', log)
            res.send('user updated  successfully');
        }
    } catch (error) {
        res.status(500).json({ message: 'something went wrong', error: error.message })
    }
})

app.delete('/delete', async (req, res) => {
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

app.post('/profile', async (req, res) => {
    try {

        const user = new userModal(req.body)
        await user.save();
        res.send("user saved successfully")
    } catch (err) {
        res.send('user addign failed')
    }
})

app.get('/user', async (req, res) => {
    try {
        const user = userModal.find({ name: req.query.name })
        console.log('user bro found', user)
        res.send('check this baba')
    } catch (error) {
        res.status(500).send("something went wrong")
    }
})

app.use('/', (err, req, res, next) => {
    res.status(500).send('something went wrong')
})

db().then((res) => {
    console.log('DB connected successfully');
    app.listen(5000, () => {
        console.log('server is running succcessfully on port 5000')
    })
}).catch((err) => {
    console.log('err came to 2nd')
})

