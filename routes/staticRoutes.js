//static routes are generally used to serve static files like css, js, images (frontend) etc.
const express = require('express');
const router = express.Router();
const URL = require('../models/url');



router.get('/home/:userName', async(req,res)=>{
    const url =  await URL.find({});
    res.render('home',{
       data: url
    });
}); 

router.get('/signup',async(req,res)=>{
   res.render('signup'); 
});

router.get('/signin',async(req,res)=>{
    res.render('signin');
});

module.exports = router;