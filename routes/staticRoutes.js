//static routes are generally used to serve static files like css, js, images (frontend) etc.
const express = require('express');
const router = express.Router();
const URL = require('../models/url');

router.get('/home', async(req,res)=>{
    if(!req.user) return res.render('home',{
        isUser: false
    });
    const url =  await URL.find({createdBy:req.user._id});
    res.render('home',{
       data: url,
       userName: await req.user.name,
       isUser: true
    });
}); 

router.get('/signup',async(req,res)=>{
   res.render('signup'); 
});

router.get('/signin',async(req,res)=>{
    res.render('signin');
});

module.exports = router;