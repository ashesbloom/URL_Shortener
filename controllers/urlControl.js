const shortid = require('shortid'); //importing the shortid module to generate a shortID (https://www.npmjs.com/package/shortid)
const URL = require('../models/url.js'); //importing the URL model



//controllers
async function GenrateShortUrl(req,res){  //path: /
    const body = req.body; //getting the body from the request
    if(!body.url){//checking if the url is present in the body
        //requiring the URLs here to avoid blank page on error message (to be fiexd in future)
        const Userurls = await URL.find({createdBy:req.user._id}); //getting all the urls created by the logged-in user
        const urls = await URL.find({}); //getting all the urls for admin page
        return res.status(400).render('home', //returning the home page with an error message
        {
            error:'URL is required!',
            data:Userurls,
            allurls:urls,
            role:req.user.role,
            userName: req.user.name
        });  
    }
    const shortId = shortid(); //generating a shortID using the shortid module

    await URL.create({ //filling a new URL entry in the database
        shortId: shortId, //url's shortID 
        redirectURL:body.url, //url to redirect
        createdBy: req.user._id, //user who created the URL
        visitTime: [], //array to store the visit time to keep record of the clicks
    });
    const Userurls = await URL.find({createdBy:req.user._id}); //getting all the urls created by the logged-in user
    const urls = await URL.find({}) //getting all the urls for admin page
    return res.render('home',{ 
        id: shortId,            //returning the home page with the shortID and other data
        data:Userurls,
        allurls:urls,
        role:req.user.role,
        userName: req.user.name
    });
}

async function redirecting_to_originalURL(req,res){ //path: /:shortID
    const urlshortId = req.params.shortID; //getting the shortID from the URL
    const entry = await URL.findOneAndUpdate( //updating the visitTime array with the current timestamp
        {
            shortId: urlshortId //searching for the shortID in the database (finding argument)
        },
        {
            $push:{ 
                visitTime:{ //(updating argument)
                    timestamp: Date.now() //pushing the current timestamp in the visitTime array 
                },
            },
        }
    );
    // Check if the entry exists
    if (!entry) {
        return res.status(404).send('URL not found'); // sending 404 Not Found if entry is null
    }
    try{
        return res.redirect(entry.redirectURL); //redirecting to the original URL
    }catch (error) {
        console.error('Error while redirecting:', error);
        return res.status(500).send('Internal Server Error'); // sending Internal Server Error in case of any other error
    }
}

async function ClearData(req,res){ //path: /delete
    await URL.deleteMany({createdBy:req.user._id}); //deleting all the URLs created by the user
    return res.json({message:'History has been cleared',redirect: '/ashes/home'}); //redirecting to the homepage
    
}

//exporting the functions
module.exports = { 
    GenrateShortUrl,
    redirecting_to_originalURL,
    ClearData
}