const express = require("express");
const router = express.Router();
const user = require("../schemas/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config;

router.post("/signup", async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    const isuserexists = await user.findOne({ email });
    if (isuserexists) {
        console.log({isuserexists})
      res.status(400).json({ Message: "email already exists" });
      return;
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newuser = await new user({
        email,
        password: hashedPassword,
        phone,
      }).save();
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      return res
        .status(200)
        .json({ Message: "account is created", token, id: newuser._id });
    }
  } catch(err) {
    console.log({err})
    res.status(500).json({ Error: err });
  }
});

router.post("/signin", async (req,res)=>{
    try{
        const {email, password}= req.body;
        const isemail= await user.findOne({email});
        if(!isemail){
            res.status(400).json({message:"email is in valid"});
            return
        }
        const ispassword= await bcrypt.compare(password, isemail.password);
        
        if(!ispassword){
            res.status(400).json({message:"invalide pasword"});
            return
        }
        
        const token= jwt.sign({email},process.env.JWT_SECRET);
        console.log("login sucessful")
        return res.status(200).json({message:"login successful", token, id:user._id});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"service error"});
    }
})

module.exports = router;
