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

app.use('/url',urlroutes); //using the url routes

app.get("/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId  
      },
      {
        $push: {    //pushing time of the get request to the visitTime array
          visitTime: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL); //redirecting to the original URL
  });


//listening to the server
app.listen(port,()=>{console.log('\nServer started at PORT:',port)});