const shortid = require('shortid');
const URL = require('../models/url');
const Users = require('../models/users.js'); 


//controllers
async function GenrateShortUrl(req,res){  // /url
    const body = req.body; //getting the body from the request
    if(!body.url) return res.status(400).json({error:'URL is required!'});  //checking if the url is present in the body
    const shortId = shortid(); //generating a shortID

    await URL.create({ //filling a new entry in the database
        shortId: shortId,
        redirectURL:body.url,
        createdBy: req.user._id,
        visitTime: [],
    });
    const urls = await URL.find({createdBy:req.user._id}); 
    return res.render('home',{
        id: shortId, //returning the shortID
        data:urls,
        isUser: true,
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
    return res.json({message:'History has been cleared',redirect: '/home'});
    
}

async function handleAdmin(req,res){ // /url/admin
    const result = await URL.find({}); //getting all the entries from the database
    const users = await Users.find({ _id: { $in: result.map(item => item.createdBy) } });
    const formattedData = result.map(item => `Orignal URL: ${item.redirectURL} _________ Short ID: ${item.shortId} _________ Created By: ${users.find(user => user._id.toString() === item.createdBy.toString()).name}`);
    return res.json(formattedData);
}

async function handleAdminClicks(req,res){ // /url/admin/:id
    const shortId = req.params.id; //getting the shortID from the URL
    const result = await URL.findOne({shortId}); //searching for the shortID in the database
    const createdBy = result.createdBy;
    const user = await Users.findOne(createdBy);
    return res.json({
        Url: result.redirectURL,
        Totalclicks: result.visitTime.length,
        createdBy: user.name,
        email: user.email,
        role: user.role
    });
}



module.exports = { //exporting the controllers
    GenrateShortUrl,
    handleAdminClicks,
    handleAdmin,
    redirecting_to_originalURL,
    ClearData
}