//static routes are generally used to serve static files like css, js, images (frontend) etc.
const express = require('express');
const router = express.Router();
const URL = require('../models/url');

router.get('/home', async(req,res)=>{ //rendering the homepage

    if(!req.user) return res.render('home',{role: false});//if user is not logged in
    
    const UserRole = await req.user.role;
    if(UserRole === 'ADMIN') return res.redirect('/admin/'); //if user is admin redirecting to the admin page
    //if user is normal user
    const url =  await URL.find({createdBy:req.user._id}); //fetching the urls created by the user
    res.render('home',{ //rendering the home page with variables
       data: url,
       userName: await req.user.name,
       role: await req.user.role
    });
}); 

router.get('/signup',async(req,res)=>{ //rendering the signup page
   res.render('signup'); 
});

router.get('/signin',async(req,res)=>{ //rendering the signin page
    res.render('signin');
});

//exporting the router
module.exports = router;