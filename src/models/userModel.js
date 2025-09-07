import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String },
    password: { type: String }
})


export const userModal = model("user", userSchema);


