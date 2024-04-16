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

app.get("/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId  //if changing it to shortid and same on the prams variable its is not working 
      },
      {
        $push: {
          visitTime: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
  });


app.listen(port,()=>{console.log('\nServer started at PORT:',port)});