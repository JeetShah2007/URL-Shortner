const mongoose =require("mongoose");
const express=require("express");
const userSchema=mongoose.Schema({
    shortId:{
        type:String,
        require:true,
        unique:true
    },
    redirectURL:{
        type:String,
        require:true
    },
    totalClicks:{
        type:Number,
        default:0
    },
    clickHistory:[{
        timestamp:{
            type:Date
        }
    }]
});
const URL=mongoose.model("url",userSchema);
module.exports=URL;