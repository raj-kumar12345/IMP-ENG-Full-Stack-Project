const { default: mongoose } = require("mongoose");

const connectDB = async (req,res) =>{
    try {
        
        const res = mongoose.connect("mongodb://localhost:27017/english")
        if(res){
            console.log('Successfully connected to DATABASE');
        }
        
    } catch (error) {
        console.log('error while connecting to DATABASE');
    }
}

module.exports = connectDB