// import mongoose, { model } from 'mongoose';
const mongoose=require('mongoose');
const model=mongoose.model

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String,required:true,unique:true,lowercase:true,minLength:3,maxLength:20,trim:true},
    password: { type: String,required:true },
    confirmpassword:{type:String,required:true},
    gender:{type:String,required:true,validate:{validator:(val)=>{
        return !['male,female'].includes(val)
    },message:props=>`'${props.value}' is not valid gender`}},
    country:{type:String,default:'India'}
},{timestamps:true});

module.exports = {userModal:model("user",userSchema)};
