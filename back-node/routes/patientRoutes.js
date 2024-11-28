const express = require('express');
const controls = require('../controller/patientControls');
const protect = require('../middleware/authMiddleWare');
const {body} = require("express-validator/check");
const Patient = require("../model/patient");
router = express.Router();
validatePAtient = [
    body('name')
        .trim()
        .not()
        .isEmpty().withMessage('name validation failed'),
    body('phoneNumber').trim().isLength({max:11}).withMessage('please enter a valid phone number')
]
router.post('/add-patient',validatePAtient
    ,protect.protect,controls.PostaddPatient);
router.get('/patients',protect.protect,controls.GetPatients);
router.get('/:nationalID',protect.protect,controls.getPatient);
router.put('/:id',protect.protect,controls.updatePatient);
module.exports = router
