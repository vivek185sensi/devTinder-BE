const express = require('express');
const userRouter = express.Router();
const userAuth = require('../middlewares/auth');
const { ConnectionRequestModel } = require('../models/connectionRequest');
const { userModal } = require("../models/userModel");



//Get all the pending connection request for the loggedIn user
userRouter.get("/requests/received", userAuth, async (req, res) => {
    try {
        const id = req.user.id
        const data = await ConnectionRequestModel.find({
            toUserId: id,
            status: "interested"
        }).populate("fromUserId", ["name", "gender"]);


        res.json({ status: true, data })
    } catch (err) {
        res.status(500).json({ status: false, message: err })
    }
})

//Get all the pending connection request for the loggedIn user
userRouter.get("/connections", userAuth, async (req, res) => {
    try {
        const id = req.user.id
        const data = await ConnectionRequestModel.find({
            $or: [{ toUserId: id, status: "accepted" }, { fromUserId: id, status: "accepted" }]
        }).populate("fromUserId", ["name", "gender"]);

        const connections = data.map((user) => {
            if (user.fromUserId._id.toString() === id.toString()) {
                return user.toUserId
            }
            return row.fromUserId
        })
        res.json({ status: true, data: connections })
    } catch (err) {
        res.status(500).json({ status: false, message: err })
    }
})

//Get all the feeds for the loggedIn user
userRouter.get("/feed", userAuth, async (req, res) => {
    console.log(req.query)
    try {
        const pageNo = parseInt(req.query.pageNo) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (pageNo - 1) * limit;

        const id = req.user.id
        const data = await ConnectionRequestModel.find({
            status: { $in: ["accepted", "ignore", "rejected", "interested"] },
            $or: [
                { toUserId: id },
                { fromUserId: id }
            ]
        }).select(["fromUserId", "toUserId"])
        let ignoreUsers = new Set();
        ignoreUsers.add(req.user.id)
        data.forEach((user) => { 
            ignoreUsers.add(user.fromUserId.toString())
            ignoreUsers.add(user.toUserId.toString())
        })
        const ignore = Array.from(ignoreUsers)
        const final = await userModal.find({ _id: { $nin: ignore } }).skip(skip).limit(limit);
        res.json({ status: true, data: ignore, dat: final})
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: err })
    }
})

module.exports = userRouter