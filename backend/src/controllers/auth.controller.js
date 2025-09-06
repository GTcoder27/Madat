import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary  from "../lib/cloudinary.js";


export const signup = async (req,res)=>{
    const {email,password,fullName:fullname} = req.body;

    console.log(req.body);
    try{
        if(!fullname || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message:"password must be at least 6 characters"});      
        }
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already exist"});
        console.log(fullname, email);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            fullname,
            email,
            password:hashedPassword,
        });
        console.log(newUser);

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                email: newUser.email,
            });

        }else{
            res.status(400).json({message:"Invalid User data"});
        }

    }catch(error){
        console.log("error in signup contrller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body;

    try{
        if(!email ||!password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid Email or Password"});
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Email or Password"});
        }
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            email: user.email,
            profilePic: user.pic,
        });
    } catch(err){
        console.log("Error in login credentials",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    }catch(err){
        console.log("error in logout controller ",err.message);
        res.send(500).json({message:"Internal Server Error"});
    }
};

// finds the user which is logged in 
export const checkAuth = (req, res) => {
    try{
        // console.log(req.user);
        res.status(200).json(req.user);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:"Internal server error"});
    }
}




