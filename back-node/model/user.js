const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        phoneNumber: {
    type: String,
},
        nationalID: {
            type: String,
            required: true,
            unique: true
        },
        token:{
            type: String
        },resetPasswordExpires:{
            type: Number
        },
        resetToken:{
            type: String
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
