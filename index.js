const express = require('express');
const app = express();
const port = 8001;
const urlroutes = require('./routes/url');
const { connectDatabase } = require('./connection.js');

//middleware
app.use(express.json());  //to create a object on json post request

connectDatabase('mongodb://localhost:27017/short-url')
    .catch((err)=>{console.log(err)})    
    .then(()=>console.log('Database Connected'));

app.use('/url',urlroutes);


app.listen(port,()=>{console.log('\nServer started at PORT:',port)});