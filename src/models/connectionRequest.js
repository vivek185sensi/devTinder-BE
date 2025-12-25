const mongoose=require("mongoose");


const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"user"},
    toUserId:{type:mongoose.Schema.ObjectId,required:true},
    status:{type:String,required:true,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message:`{value} is incorrect status type`
        }
    }

},{timestamps:true})

connectionRequestSchema.index({fromUserId:1,toUserId:1},{unique:true})
connectionRequestSchema.index({fromUserId:1,status:1})
connectionRequestSchema.index({toUserId:1,status:1})

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this
    // console.log("chcek in schema",connectionRequest)
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot create Yourself")
    }
    next();
})

module.exports={ConnectionRequestModel:mongoose.model('ConnectionRequest',connectionRequestSchema)}