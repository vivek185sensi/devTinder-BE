// import mongoose, { model } from 'mongoose';
const mongoose = require('mongoose');
const { emailRegex } = require('../../constants/regex');
const model = mongoose.model
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();




const userSchema = new Schema({
    name: { type: String, required: true, unique: true, lowercase: true, minLength: 3, maxLength: 20, trim: true },
    email: {
        type: String, required: true, validate: {
            validator: (val) => {
                console.log(emailRegex.test(val))
                return emailRegex.test(val)
            }, message: (props) => `${props.value} is not a valid email`
        }
    },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    gender: {
        type: String, required: true, validate: {
            validator: (val) => {
                return !['male,female'].includes(val)
            }, message: props => `'${props.value}' is not valid gender`
        }
    },
    country: { type: String, default: 'India' }
}, { timestamps: true });

userSchema.methods.passwordValidate = async function (inputPassword) {
    user = this
    validatePassword = await bcrypt.compare(inputPassword, user.password)
    return validatePassword
}

userSchema.methods.getJwt = async function () {
    user = this
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY,{expiresIn:`7d`})
    return token
}

module.exports = { userModal: model("user", userSchema) };
