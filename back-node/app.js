const express = require('express');
const bp = require('body-parser');
const path = require('path');
const multer = require('multer');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const patientRoute = require('./routes/patientRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'images');
    },
    filename: (req,file,cb)=>{
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
connectDB();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());// for using application/json
app.use(bp.urlencoded({extended: false}));// for form data
app.use(multer({storage: fileStorage}).single('image'));
app.use('/images',express.static(path.join(__dirname,'images')));
app.use('/patients',patientRoute);
app.use('/users',userRoutes);
app.listen(port,()=>{
    console.log(`server started on port${port}`);
});
