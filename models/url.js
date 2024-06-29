const { default: mongoose } = require('mongoose'); 
const mongo = require('mongoose');//importing the mongoose module

//schema
const urlschema = new mongo.Schema({ //creating a schema for the URL
    shortId:{ //shortID for the URL
        type:String,
        required: true,
        unique:true
    },
    redirectURL:{  //URL to redirect
        type:String,
        required:true
    },
    visitTime: [{timestamp:{type:Number}}], //array to store the visit time to keep record of the clicks

    createdBy:{ //user who created the URL
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    expiresAt:{ //Creating an TTL(time to live) index to automaticlly delete urls after 3 days
        type:Date,
        default: () => Date.now() + 259200 * 1000,
        index: {expires:'3d'} 
    }
},{timestamps:true}); //timestamps to keep track of the creation and updation of the URL

//model
const Url = mongo.model('url',urlschema); //creating a model for the URL schema

module.exports = Url; //exporting the model