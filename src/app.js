const express=require('express');
const { userAuth, adminAuth } = require('./middlewares/auth');
const app=express()

app.get('/no*w',(req,res)=>{
    res.send('this is multiples')
})

app.get('/admin',adminAuth);

app.get('/admin/data',(req,res)=>{
    res.send('hello admin')
});

app.get('/user',userAuth,(req,res)=>{
    console.log('check the user')
    res.send('hello user')
})




app.get('/nex',(req,res,next)=>{
    console.log('this is nex log')
    // res.send('this is nex response')
    next()
},(req,res,next)=>{
    console.log('this 2nd nex log')
    throw new Error('some hit')
    res.send('this is 2ND nex response')
})


app.use('/',(err,req,res,next)=>{
    res.status(500).send('something went wrong')
})

app.listen(5000,()=>{
    console.log('server is running succcessfully')
})