
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./config/database');
const cookieParser = require('cookie-parser');

dotenv.config();


app.use(cookieParser());
app.use(express.json());

const authRouter = require('./routes/auth');
const userRouter=require('./routes/user')
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use('/auth', authRouter);
app.use('/user',userRouter);
app.use('/profile', profileRouter);
app.use('/request', requestRouter);

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
})

db().then((res) => {
    console.log('DB connected successfully');
    app.listen(5000, () => {
        console.log('server is running succcessfully on port 5000')
    })
}).catch((err) => {
    console.log('err came to 2nd')
})

