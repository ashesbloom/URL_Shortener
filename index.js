const express = require('express');
const app = express();

const path = require('path'); //to navigate the ejs files we need path module
const port = 8001; 

//Importing the routes
const urlroutes = require('./routes/urlRoutes.js');
const staticRoutes = require('./routes/staticRoutes.js');
const userRoutes = require('./routes/usersRoutes.js');
const adminRoutes = require('./routes/AdminRoutes.js');

const { connectDatabase } = require('./connection.js'); //Importing the connection file

const {UserAuthentication,Authorization} = require('./middleware/auth.js'); //Importing custom middlewares

const cookieParser = require('cookie-parser'); //to extract and convert the cookies into object


connectDatabase('mongodb://localhost:27017/url-shortner') //connecting to the database
    .catch((err)=>{console.log(err)})    
    .then(()=>console.log('Database Connected')
);

//setting the view engine
app.set("view engine","ejs");
//setting the views directory
app.set("views",path.resolve('./views'));
//to use the static files in the public folder
app.use(express.static(path.resolve('./public'))); 

//middlewares
app.use(express.json());  //to create a object on json post request
app.use(express.urlencoded({extended:false})); //to create a object on form input in html
app.use(cookieParser()); //to extract and convert the cookies into object
app.use(UserAuthentication); //checking the user

//routes
app.use('/ashes',staticRoutes); //Frontend routes
app.use('/user',userRoutes); //User handling routes (signup,login,logout)
app.use('/admin',Authorization(['ADMIN']),adminRoutes); //Admin handlingroutes (delete,view all urls,view all users)
app.use('/',Authorization(['USER','ADMIN']),urlroutes); //URL handling routes (shorten,redirecting,delete)

//listening to the server
app.listen(port,()=>{console.log('\nServer started at PORT:',port)});

