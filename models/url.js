const mongo = require('mongoose');

//schema
const urlschema = new mongo.Schema({
    shortId:{
        type:String,
        required: true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitTime: [{timestamp:{type:Number}}],
},{timestamps:true});

//model
const Url = mongo.model('url',urlschema);

module.exports = Url;