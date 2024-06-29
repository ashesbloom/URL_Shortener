const mongo = require('mongoose'); //importing the mongoose module

//schema
const userschema = new mongo.Schema({ //creating a schema for the user
    name:{ //name of the user
        type:String,
        required:true
    },
    email:{  //email of the user
        type:String,
        required:true,
        unique:true
    },
    password:{  //password of the user
        type:String,
        required:true
    },
    role:{  //role of the user
        type:String,
        default:'USER', //default role is USER
        required:true
    }
},{ timestamps:true }); //timestamps to keep track of the creation and updation of the user

//creating model
const users = mongo.model("users",userschema); //creating a model for the user schema

module.exports = users;//exporting the model
