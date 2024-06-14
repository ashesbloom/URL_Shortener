const express = require('express');
const app = express();
const path = require('path');
const port = 8001;
const URL = require('./models/url.js');
const urlroutes = require('./routes/urlRoutes.js');
const staticRoutes = require('./routes/staticRoutes.js');
const { connectDatabase } = require('./connection.js'); 
const exp = require('constants');


connectDatabase('mongodb://localhost:27017/url-shortner')
    .catch((err)=>{console.log(err)})    
    .then(()=>console.log('Database Connected')
);
//setting the view engine
app.set("view engine","ejs");
//setting the views directory
app.set("views",path.resolve('./views'));
//to use the static files in the public folder
app.use(express.static(path.resolve('./public'))); 

//middleware
app.use(express.json());  //to create a object on json post request
app.use(express.urlencoded({extended:false})); //to create a object on form input in html

//routes
app.use('/ashes',urlroutes); //using the url routes
app.use('/',staticRoutes); //using the static routes

//listening to the server
app.listen(port,()=>{console.log('\nServer started at PORT:',port)});
