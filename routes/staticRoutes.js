//static routes are generally used to serve static files like css, js, images (frontend) etc.
const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.render('home');
}); 

module.exports = router;