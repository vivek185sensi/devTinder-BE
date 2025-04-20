const express=require('express');
const app=express()

app.use('/',(req,res)=>{
    res.send('Hello Nodejs app')
})

app.use('/local',(req,res)=>{
    res.send('i am local')  
})

app.listen(5000,()=>{
    console.log('server is running succcessfully')
})