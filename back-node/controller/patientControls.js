const asyncHandler = require('express-async-handler');
const Patient = require('../model/patient');
const { validationResult } = require('express-validator/check');
// add new patient
//POST method
exports.PostaddPatient = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    nid = req.body.nationalID;
    const patient = await Patient.create({
        user: req.user.id,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        nationalID: req.body.nationalID,
        address: req.body.address,
        dob: req.body.dob,
        gender: req.body.gender
    });

    res.status(200).json(patient);
});
// get  all patients
//GET method
exports.GetPatients = asyncHandler(async(req,res,next)=>{
    const patients = await Patient.find();
    if (!patients) {
        res.status(400)
        throw new Error('patients not found')
    }
    res.json(patients);
} );
// get patient by id
//GET method
exports.getPatient = asyncHandler(async (req, res,next) => {
    const patient = await Patient.findOne({nationalID: req.params.nationalID});

    if (!patient) {
        res.status(400)
        throw new Error('patient not found')
    }

    res.status(200).json(patient);
})
// update patient
// PUT method
exports.updatePatient = asyncHandler(async (req, res,next) => {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
        res.status(400)
        throw new Error('patient not found')
    }

    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPatient);
})
