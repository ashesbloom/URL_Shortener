const express = require('express');
const app = express();
const port = 8001;
const URL = require('./models/url.js');
const urlroutes = require('./routes/url');
const { connectDatabase } = require('./connection.js'); 


connectDatabase('mongodb://localhost:27017/url-shortner')
    .catch((err)=>{console.log(err)})    
    .then(()=>console.log('Database Connected')
);

//middleware
app.use(express.json());  //to create a object on json post request

app.use('/url',urlroutes); 

//listening to the server
app.listen(port,()=>{console.log('\nServer started at PORT:',port)});