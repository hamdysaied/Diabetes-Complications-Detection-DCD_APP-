const mongoose = require('mongoose');
const patientSchema = mongoose.Schema({
        name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    nationalID: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },

    gender: {
        type: String,
    }
},
{
    timestamps: true,
});
module.exports = mongoose.model('Patient', patientSchema);
