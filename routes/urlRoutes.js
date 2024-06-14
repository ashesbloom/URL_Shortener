const express = require('express');
const router = express.Router();
const { GenrateShortUrl,handleAdminClicks,handleAdmin,redirecting_to_originalURL} = require('../controllers/url.js');
const { required } = require('nodemon/lib/config/index.js');


router.post('/',GenrateShortUrl); //generating short URL

router.get('/admin/:id',handleAdminClicks); //getting the total clicks on a short URL

router.get('/admin',handleAdmin);  //getting all the short URL's id and original URL

router.get('/:shortID',redirecting_to_originalURL); //redirecting to the original URL

module.exports = router;