const express=require("express");
const app=express();
const user =require('./route/user')

require("dotenv").config();
const PORT = process.env.PORT||3000;
app.use(express.json());
require('./config/database').connect();

app.use('/api',user);

app.listen(PORT,()=>{
    console.log(`chal gya port ${PORT} pr`)
})  

app.get('/',(req,res)=>{
    res.send("chl rha hai")
})
