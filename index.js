const express= require("express");
const app=express();
const env=require("dotenv");
env.config();
const PORT= process.env.PORT|| 3000;

app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(PORT,()=>{
    console.log("server is runing");
})