const express = require('express');
const router = express.Router();
const { GenrateShortUrl,handleAdminClicks,handleAdmin} = require('../controllers/url.js');

router.post('/',GenrateShortUrl); //generating short URL

router.get('/admin/:id',handleAdminClicks); //getting the total clicks on a short URL

router.get('/admin',handleAdmin);  //getting all the short URL's id and original URL

module.exports = router;