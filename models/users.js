const { required } = require("nodemon/lib/config");

const mongo = require('mongoose');

//schema
const userschema = new mongo.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'USER',
        required:true
    }
},{ timestamps:true });

//creating model
const users = mongo.model("users",userschema);

module.exports = users;
