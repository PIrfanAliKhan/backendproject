const { request } = require("express");
const mongoose=require("mongoose");
const { emit } = require("nodemon");
const schema = mongoose.Schema({
    name:{
        type:String,
        request:true,
    },
    email:{
        type:String,
        request:true,
        unique:true,
    },
    password:{
        type:String,
        request:true,

    },
    phone:{
        type:String,
        request:true
    }
});

module.exports = mongoose.model('User', schema);