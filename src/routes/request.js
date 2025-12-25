const express = require('express');
const requestRouter = express.Router();
const { userModal } = require('../models/userModel');
const { ConnectionRequestModel } = require("../models/connectionRequest")
const userAuth = require('../middlewares/auth');
const { request } = require('http');


requestRouter.get('/user', userAuth, async (req, res) => {
    try {
        const user = await userModal.findOne({ name: req.query.name })
        console.log('user', user)
        res.json({
            message: 'User found baba',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                country: user.country,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    } catch (error) {
        res.status(500).send("something went wrong")
    }
})

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user.id
        const status = req.params.status
        const toUserId = req.params.toUserId
        const statustype = ['interested', 'rejected']
        const connectionRequest = new ConnectionRequestModel({ fromUserId, toUserId, status })
        const user = userModal.findById(toUserId)
        if (!user) { return res.status(404).send({ message: "User not found" }) }
        if (!statustype.includes(status)) {
            return res.status(401).send({ message: 'Invalid Request' })
        }
        const existingConnection = await ConnectionRequestModel.findOne({
            $or: [{ fromUserId, toUserId }, { fromUserId: toUserId, toUserId: fromUserId }]
        })
        if (existingConnection) {
            return res.status(401).send({ message: "Request Already Rised" })
        }

        const data = await connectionRequest.save()
        res.json({ status: true, data })
    } catch (err) {
        console.log('check the', err)
        res.status(500).json({ message: 'Something went wrong', error: err.message });

    }
})

requestRouter.post("/review/:status/:requestedId", userAuth, async (req, res) => {
    try {
        console.log("userid",req.user)
        const fromUserId = req.user.id
        const status = req.params.status
        const requestedId=req.params.requestedId
        const statusTypes = ["accepted", "ignore"]
        if (!statusTypes.includes(status)) {
            res.status(400).json({ status: false, message: "Invalid Status" })
        }
        const connections=await ConnectionRequestModel.findOne({
            _id:requestedId,
            toUserId:fromUserId,
            status:"interested"
        })
        console.log("check this",connections,fromUserId)
        if(!connections){
            res.status(404).json({status:false,message:"No status found"})
        }
        connections.status=status
        let data=await connections.save()
        res.status(200).json({status:true,message:`connection request ${status} `+data})
    } catch (err) {
        console.log('check the review status', err)
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
})


module.exports = requestRouter 