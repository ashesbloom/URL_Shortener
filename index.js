const express = require('express');
const app = express();
const path = require('path'); //to navigate the ejs files
const port = 8001; 
const URL = require('./models/url.js'); //importing the URL model
const urlroutes = require('./routes/urlRoutes.js');
const staticRoutes = require('./routes/staticRoutes.js');
const userRoutes = require('./routes/usersRoutes.js');
const adminRoutes = require('./routes/AdminRoutes.js');
const { connectDatabase } = require('./connection.js'); 
const {UserAuthentication,Authorization} = require('./middleware/auth.js');
const cookieParser = require('cookie-parser'); //to use the cookies


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

//middleware
app.use(express.json());  //to create a object on json post request
app.use(express.urlencoded({extended:false})); //to create a object on form input in html
app.use(cookieParser()); //to use the cookies
app.use(UserAuthentication); //checking the user

//routes
app.use('/ashes',staticRoutes); //using the static routes
app.use('/user',userRoutes); //using the users routes
app.use('/admin',Authorization(['ADMIN']),adminRoutes); //using the admin routes 
app.use('/',Authorization(['USER','ADMIN']),urlroutes); //using the url routes

//listening to the server
app.listen(port,()=>{console.log('\nServer started at PORT:',port)});

