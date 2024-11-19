const jwt= require("jsonwebtoken");
const env= require("dotenv");
env.config();
const isLoggedin=(req, res, next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET,(err, decoded)=>{
            if(err){
                res.status(401).json({message:"invalid tocken"});
            }
            else{
                req.user=decoded;
                next();
            }
        });
    }
    else{
        res.status(401).json({message:"No token"});
    }

}

module.exports= {isLoggedin};