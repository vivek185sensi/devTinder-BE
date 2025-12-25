const express=require('express');
const userRouter=express.Router();
const userAuth=require('../middlewares/auth');
const {ConnectionRequestModel} = require('../models/connectionRequest');
const {userModal}=require("../models/userModel");



//Get all the pending connection request for the loggedIn user
userRouter.get("/requests/received",userAuth,async(req,res)=>{
    try{
        const id=req.user.id
        const data=await ConnectionRequestModel.find({
            toUserId:id,
            status:"interested"
        }).populate("fromUserId",["name","gender"]);

        
        res.json({status:true,data})
    }catch(err){
        res.status(500).json({status:false,message:err})
    }
})

//Get all the pending connection request for the loggedIn user
userRouter.get("/connections",userAuth,async(req,res)=>{
    try{
        const id=req.user.id
        const data=await ConnectionRequestModel.find({
            $or:[{ toUserId:id,status:"accepted"},{fromUserId:id,status:"accepted"}]           
        }).populate("fromUserId",["name","gender"]);  

        const connections=data.map((user)=>{
            if(user.fromUserId._id.toString() === id.toString()){
                return user.toUserId
            }     
            return row.fromUserId
    })
        res.json({status:true,data:connections})
    }catch(err){
        res.status(500).json({status:false,message:err})
    }
})

module.exports=userRouter