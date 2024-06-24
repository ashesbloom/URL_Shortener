const express = require('express');
const router = express.Router();
const { GenrateShortUrl,handleAdminClicks,handleAdmin,redirecting_to_originalURL} = require('../controllers/url.js');

router.post('/',GenrateShortUrl); //generating short URL

router.get('/:shortID',redirecting_to_originalURL); //redirecting to the original URL

module.exports = router;