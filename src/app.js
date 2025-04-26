const express=require('express');
const app=express()


app.post('/local/boy',(req,res)=>{
    res.send('sub local')
})


app.get('/local',(req,res)=>{
    res.send('i am local')  
})

app.delete('local',(req,res)=>{
    res.send('finall delete')
})

app.get(/.*fly$/,(req,res)=>{
    res.send('this is regex');
})

app.get('n?w',(req,res)=>{
    res.send('this is question')
})

app.get('no*w',(req,res)=>{
    res.send('this is multiples')
})

app.get('som+e',(req,res)=>{
    res.send('this is add ')
})

app.get('e(ve)+n',(req,res)=>{
    res.send('this is group ')
})

app.use('/',(req,res)=>{
    res.send('Hello Nodejs app')
})

app.listen(5000,()=>{
    console.log('server is running succcessfully')
})