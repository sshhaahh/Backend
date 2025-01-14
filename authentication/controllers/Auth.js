const bcrypt = require("bcrypt")
const User = require("../models/schema")

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



exports.login=()=>{

}

