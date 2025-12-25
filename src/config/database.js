const mongoose=require('mongoose');

const db=async()=>   await mongoose.connect('mongodb+srv://b26:b26@cluster0.wypyj.mongodb.net/namaste?retryWrites=true&w=majority&appName=Cluster0');


module.exports=db

