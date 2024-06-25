const express = require('express');
const router = express.Router();
const { GenrateShortUrl,redirecting_to_originalURL,ClearData} = require('../controllers/url.js');

router.post('/',GenrateShortUrl); //generating short URL
router.get('/:shortID',redirecting_to_originalURL); //redirecting to the original URL
router.post('/delete',ClearData); 

module.exports = router;