const { default: mongoose } = require("mongoose");

const connectDB = async (req,res) =>{
    try {
        
        const res = mongoose.connect(process.env.MONGO_URL)
        if(res){
            console.log('Successfully connected to DATABASE');
        }
        
    } catch (error) {
        console.log('error while connecting to DATABASE');
    }
}

module.exports = connectDB