const shortid = require('shortid');
const URL = require('../models/url.js');

const users = require('../models/users.js');


//controllers
async function GenrateShortUrl(req,res){  // /url
    const body = req.body; //getting the body from the request
    if(!body.url){
        const Userurls = await URL.find({createdBy:req.user._id}); 
        const urls = await URL.find({});
        return res.status(400).render('home',  //checking if the url is present in the body
        {
            error:'URL is required!',
            data:Userurls,
            allurls:urls,
            role:req.user.role,
            userName: req.user.name
        });  
    }
    const shortId = shortid(); //generating a shortID

    await URL.create({ //filling a new entry in the database
        shortId: shortId,
        redirectURL:body.url,
        createdBy: req.user._id,
        visitTime: [],
    });
    const Userurls = await URL.find({createdBy:req.user._id}); 
    const urls = await URL.find({})
    return res.render('home',{
        id: shortId, //returning the shortID
        data:Userurls,
        allurls:urls,
        role:req.user.role,
        userName: req.user.name
    });
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
    // Check if the entry exists
    if (!entry) {
        return res.status(404).send('URL not found'); // sending 404 Not Found if entry is null
    }
    // Redirect to the original URL
    try{
        return res.redirect(entry.redirectURL);
    }catch (error) {
        console.error('Error while redirecting:', error);
        return res.status(500).send('Internal Server Error'); // sending 500 Internal Server Error in case of any other error
    }
}

async function ClearData(req,res){
    await URL.deleteMany({createdBy:req.user._id});
    return res.json({message:'History has been cleared',redirect: '/ashes/home'});
    
}

module.exports = { //exporting the controllers
    GenrateShortUrl,
    redirecting_to_originalURL,
    ClearData
}