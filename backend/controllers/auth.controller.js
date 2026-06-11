const userModel = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const userRegisterController = async (req,res) =>{
    try {
        
        console.log("REGISTER API HIT");
        console.log(req.body);


        const { name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message: "All Fields are required"
            })
        }
        const normalizedEmail = email.toLowerCase();

        const existUser = await userModel.findOne({ email: normalizedEmail });
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists, please login",
            });
        }

        const hashPassword = await bcrypt.hash(password,10);
        const newUser = await userModel.create({
            name, email: normalizedEmail, password: hashPassword,
        });

        const token = jwt.sign({id: newUser._id}, process.env.JWT_TOKEN_KEY,{expiresIn: "30d"});
        newUser.activeToken = token;
        await newUser.save();
        res.cookie("token",token);

        const responseUser = newUser.toObject();
        delete responseUser.password;

        return res.status(201).json({
            success: true,
            message: "new User Registered",
            user: responseUser
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const userLoginController = async (req,res) =>{
    try {
        const {email,password} = req.body;
        if( !email || !password){
            return res.status(400).json({
                message: "All Fields are required"
            })
        }
        const normalizedEmail = email.toLowerCase();
        const existUser = await userModel.findOne({ email: normalizedEmail });
        if (!existUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const checkPassword = await bcrypt.compare(password,existUser.password);
        if(!checkPassword){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign({id: existUser._id,role: existUser.role}, process.env.JWT_TOKEN_KEY,{expiresIn: "30d"});
        existUser.activeToken = token;
        await existUser.save();
        res.cookie("token",token);

        const responseUser = existUser.toObject();
        delete responseUser.password;

        return res.status(200).json({
            success: true,
            message: "Logged In Successfully",
            user: responseUser,
            token,
            isAdmin: existUser.role === "admin"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



const userCurrentLoginController = async (req,res) =>{
    try {

        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({
            success: true,
            message: "current user Fetched",
            user: user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports = { userRegisterController , userLoginController, userCurrentLoginController}