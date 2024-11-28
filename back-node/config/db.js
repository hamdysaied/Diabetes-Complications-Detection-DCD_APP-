const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async() => {
    try {
        const conn = await mongoose.connect('mongodb+srv://mheba509:v3962W1QD3eHK6zt@cluster0.9thadgh.mongodb.net/DCD?retryWrites=true&w=majority');
    }
    catch (error){
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB