const express=require("express");
const router=express.Router();
const {auth,isStudent,isAdmin} = require('../middlewares/authMiddleware');

const {login,signup}=require('../controllers/Auth');

router.post('/login',login);
router.post('/signup',signup);

router.post('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Admin Login Successfully."
    })
    
});

router.post('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Admin Login Successfully."
    })
});


module.exports=router;  
