const mongo = require('mongoose');

async function connectDatabase(url){
    return mongo.connect(url);
}

module.exports = {
    connectDatabase
}