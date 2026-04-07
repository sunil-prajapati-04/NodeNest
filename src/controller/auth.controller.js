import User from '../models/auth.model.js';
import {genToken} from '../lib/utlis.js';

export const signup = async (req,res)=>{
    try {
        const {fullName,email,password}  = req.body;
        const user = await User.findOne({email});
        if(!fullName || !email || !password){
            return res.status(404).json({message:"All fileds are required"});
        }
        if(user){
            return res.status(404).json({message:"email already exists"});
        }
        if(password.length<6){
            return res.status(404).json({message:"Password must be atleast 6 charcter"});
        }
        const newUser = new User({
            fullName,
            email,
            password
        })
        const respon = await newUser.save();
        console.log(respon);
        res.status(200).json({message:"Registered successfully"});
    } catch (error) {
        console.log("error in signup controller :",error);
        res.status(500).json({message:"internal server error"});
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(404).json({message:"invalid email or password"});
        }
        const payload = {
            Id:user._id,
            username:user.fullName
        }
        const token = await genToken(payload);
        res.cookie('jwtToken',token,{
            maxAge:7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            sameSite:"strict",
            secure:false
        })
        console.log("token :",token);
        res.status(200).json({message:"login successfully"});
    } catch (error) {
        console.log("error in login controller :",error);
        res.status(500).json({message:"internal server error"});
    }
}

export const myProfile = async(req,res)=>{
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        console.log("error in myProfile controller :",error);
        res.status(500).json({message:"internal server error"});
    }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("jwtToken",{
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })
        res.status(200).json({message:"Logout Successfully"});
    } catch (error) {
        console.log("error in Logout controller :",error);
        res.status(500).json({message:"internal server error"});
    }
}