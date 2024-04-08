const mongo = require('mongoose');

//schema
const urlschema = new mongo.Schema({
    urlId:{
        type:String,
        require: true,
        unique:true
    },
    redirectUrl:{
        type:String,
        require:true
    },
    visitTime: [{
        timestamp:{type:Number}
    }]
},{timestamp:true});

//model
const Url = mongo.model('url',urlschema);

module.exports = Url;