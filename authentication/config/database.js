const mongoose = require("mongoose");
require('dotenv').config();
exports.connect=()=>{
    mongoose.connect(process.env.URL)
    .then(()=>{console.log("DB Connected Successfully")})
    .catch((e)=>{
        console.log("DB connect ni hora");
        console.log(e);
        process.exit(1);
    })
}