const { default: mongoose } = require('mongoose');
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

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    expiresAt:{
        type:Date,
        default: () => Date.now() + 259200 * 1000,
        index: {expires:'3d'}
    }
},{timestamps:true});

//Creating an TTL(time to live) index to automaticlly delete urls after 3 days(259200 sec)


//model
const Url = mongo.model('url',urlschema);

module.exports = Url;