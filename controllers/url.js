const shortid = require('shortid');
const URL = require('../models/url');

async function GenrateShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    const shortId = shortid();

    await URL.create({
        shortId: shortId,
        redirectURL:body.url,
        visitTime: [],
    });

    return res.json({id: shortId});
}

async function handleAdmin(req,res){
    const result = await URL.find({});
    const formattedData = result.map(item => `Orignal URL: ${item.redirectURL} _________ Short ID: ${item.shortId}`);
        
    res.json(formattedData);
}

async function handleAdminClicks(req,res){
    const shortId = req.params.id;
    const result = await URL.findOne({shortId});
    
    return res.json({Totalclicks:result.visitTime.length,});
}


module.exports = {
    GenrateShortUrl,
    handleAdminClicks,
    handleAdmin
}