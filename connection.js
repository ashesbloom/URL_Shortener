const mongo = require('mongoose');

async function connectDatabase(url){ //connecting to the database
    return mongo.connect(url);
}

module.exports = {
    connectDatabase
}