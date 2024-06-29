const mongo = require('mongoose'); //importing the mongoose module

async function connectDatabase(url){ 
    return mongo.connect(url); //connection request to the database
}

//exporting the function
module.exports = { 
    connectDatabase
}