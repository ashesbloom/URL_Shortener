const shortid = require('shortid');
const URL = require('../models/url');

async function GenrateShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    const shortId = shortid();
    await URL.create({
        urlId: shortId,
        redirectUrl:body.url,
        visitTime: []
    });
    return res.json({id:shortId});
}

async function handdleRedirectUrl(req,res){
    const shortid = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortid
    },
    {$push:{
        visitTime:{
            timestamp:Date.now(),
        },
    }}
    );
    res.redirect(entry.redirectURL);  //error here 
};



module.exports = {
    GenrateShortUrl,
    handdleRedirectUrl
}