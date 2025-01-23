const jwt=require('jsonwebtoken');
require('dotenv').config();
exports.auth=(req,res,next)=>{
    try{
        const token=req.body.token;
        if(!token){
            return res.json({
                success:false,
                message:"Token not found!"
            })
        }

        const decode=jwt.verify(token,process.env.JWT_KEY);
        req.user=decode;

        next();

    }catch(e){
        res.json({
            success:false,
            message:"Invalid Token!"
        })
    }
}

exports.isStudent=(req,res,next)=>{
    if(req.user.role!=='Student'){
        return res.json({
            success:false,
            message:"Restricted for Student."
        })
    }
    console.log(req.user)
    next()
}


exports.isAdmin=(req,res,next)=>{
    if(req.user.role!=='Admin'){
        return res.json({
            success:false,
            message:"Restricted for Admin."
        })
    }
    next()
}