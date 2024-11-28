const jwt = require('jsonwebtoken');
require("dotenv").config();
const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/user');
const ejs = require("ejs");
const fs = require("fs");
const nodemailer = require('nodemailer');
const sgt = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const emailTemplate = fs.readFileSync("./views/emailtemplate.ejs", "utf8");
const signuptemplate = fs.readFileSync('./views/signuptemplate.ejs','utf8');
const transporter = nodemailer.createTransport(sgt({    auth:{
       api_key: process.env.SENDGRID_API_KEY
    }}
))
const apikey = process.env.open_AI_API_key;
const configuration = new Configuration({
    apiKey: apikey,
});
const openai = new OpenAIApi(configuration);

//signup user
//POST method
exports.registerUser = (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const {  password } = req.body 
    // Hash password
    bcrypt.hash(password,10).then(hashedPassword=>{
            // Create user
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                nationalID: req.body.nationalID,
                phoneNumber: req.body.phoneNumber
            })
            return user.save();
        }).then( transporter.sendMail({
                to: req.body.email,

                from: 'dcdgraduationproject@gmail.com',
                subject: 'successful registration',
                html: ejs.render(signuptemplate)
            })

        ).then( res.status(201).json({message:" user sign up successfully"}))
        .catch(
        err => {
            console.log(err);
        }
    )}

const generateToken = (id) => {

    const token = jwt.sign({id} , process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
    return token
}
//login user
//POST method
exports.loginUser = asyncHandler(async (req,res,next)=>{
 const email = req.body.email;
 const password = req.body.password;
 const user = await User.findOne({email});
 console.log(user);
 if(user && await bcrypt.compare(password,user.password)){
     res.json({
         _id: user.id,
         name: user.name,
         email: user.email,
         token: generateToken(user.id),
     })
 } else {
     res.status(400)
     throw new Error('Invalid credentials')
 }
})
//get the current user data
//GET method
exports.getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})
//set token
//post method
exports.setToken = asyncHandler(async (req,res,next)=>{
    const email = req.body.email;
    const user = await User.findOne({email});
    if(!user){
       return  res.status(404).json({message:" user not found"});
    }
    const resetToken = crypto
        .randomBytes(20).toString('hex');
    user.resetToken = resetToken
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save().then(transporter.sendMail({
        to: user.
            email,
        from: 'dcdgraduationproject@gmail.com',
        subject: 'password reset',
        html: ejs.render(emailTemplate, { host: req.headers.host, resetToken: resetToken})
    })
).then(
    res.json({message:'reset password email is sent with the link',
        link:`http://${req.headers.host}/users/reset-password?resetToken=${resetToken}`,
    token:resetToken})).catch(err=>{
        console.log(err)
    })
});
exports.resetPassword= async (req,res,next)=>{
const {resetToken} = req.query;
const user = await User.findOne({ resetToken});
    if(!user){
        return  res.status(404).json({message:" user not found"});
    }
    if(user.resetTokenExpiration> Date.now()){
        res.status(502).json({
            message:'token timed out'
        })
    }
const newpass = req.body.password;
    const hashpass = await bcrypt.hash(newpass,10);
 await User.findOneAndUpdate({resetToken: resetToken},{
        password: hashpass,
        resetToken:undefined,
        resetTokenExpiration: undefined
    })
res.status(200).json(user);}
// intialize chat
// POST method
exports.processChat = async (req,res,next)=>{
    const { message } = req.body;
 
     try {
         const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
             max_tokens: 100,
           //  temperature: 0
         });
 
 
        res.json({ "response":response.data.choices[0].text });
     } catch (error) {
         console.log('Error:', error);
         res.status(500).json({ error: 'An error occurred.' });
     }
 }


