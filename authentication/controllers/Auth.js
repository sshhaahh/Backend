const bcrypt = require("bcrypt")
const User = require("../models/schema");
const jwt = require('jsonwebtoken')
require('dotenv').config();
exports.signup=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body
        const alreadyExist=await User.findOne({email})

        if(alreadyExist){
            return res.status(409).json({
                success:false,
                message:"User Already Exist",
            })
        }

        let hashedPass;
        try{
            hashedPass=await bcrypt.hash(password,10);
        }catch(e){
            return res.json({
                success:false,
                message:"Password hash nhi hua",
            })
        }

        const user=await User.create({name,email,password:hashedPass,role})

        res.json({
            success:true,
            message:"User Created Successfully",
            data:user,
        })

    }catch(e){
        console.log(e)
        res.json({
            success:false,
            message:"Sign up nhi hua Schema se connection me problem hai"
        })
    }
}



exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email && !password){
            return res.status(500).json({
                success:false,
                message:"Please Enter Email and Password!"
            })
        }
        
        const user=await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"User Not Found",
            })
        }
        
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                password:user.password,
                role:user.role,
            }
            
            const token = jwt.sign(payload,process.env.JWT_KEY,{
                expiresIn:"2h",
            });
            // console.log(user)
            const options = {
                httpOnly: true,
                
                maxAge: 2 * 60 * 60 * 1000,
              };
              user.password=undefined;
              user.token=token;

            return res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully"
            })



        }else{
            return res.json({
                success:false,
                message:"Wrong Password!"
            })
        }

    }
    catch(e){
        return res.json({
            success:false,
            message:"Login Failed"
        })
    }
}

