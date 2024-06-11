const shortid = require('shortid');
const URL = require('../models/url');
const port = require('../index.js').port;

//controllers

async function GenrateShortUrl(req,res){  // /url
    const body = req.body; //getting the body from the request
    if(!body.url) return res.status(400).json({error:'url is required'}) //checking if the url is present in the body
    const shortId = shortid(); //generating a shortID

    await URL.create({ //filling a new entry in the database
        shortId: shortId,
        redirectURL:body.url,
        visitTime: [],
    });

    return res.render('home',{
        id: shortId, //returning the shortID
        port:port
    });
}

async function handleAdmin(req,res){ // /url/admin
    const result = await URL.find({}); //getting all the entries from the database
    const formattedData = result.map(item => `Orignal URL: ${item.redirectURL} _________ Short ID: ${item.shortId}`); //formatting the data
    return res.json(formattedData);
}

async function handleAdminClicks(req,res){ // /url/admin/:id
    const shortId = req.params.id; //getting the shortID from the URL
    const result = await URL.findOne({shortId}); //searching for the shortID in the database
    
    return res.json({Totalclicks:result.visitTime.length,}); //returning the total clicks on the short URL
}

async function redirecting_to_originalURL(req,res){ // /url/:shortID
    const urlshortId = req.params.shortID; //getting the shortID from the URL
    const entry = await URL.findOneAndUpdate(
        {
            shortId: urlshortId //searching for the shortID in the database
        },
        {
            $push:{
                visitTime:{
                    timestamp: Date.now() //pushing the current timestamp in the visitTime array
                },
            },
        }
    );
    return res.redirect(entry.redirectURL); //redirecting to the original URL
}

module.exports = { //exporting the controllers
    GenrateShortUrl,
    handleAdminClicks,
    handleAdmin,
    redirecting_to_originalURL
}