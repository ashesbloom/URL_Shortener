const express = require('express');
const router = express.Router();
//importing the URL model
const { GenrateShortUrl,redirecting_to_originalURL,ClearData} = require('../controllers/urlControl.js');

router.post('/',GenrateShortUrl); //generating short URL
router.get('/:shortID',redirecting_to_originalURL); //redirecting to the original URL
router.post('/delete',ClearData); //deleting previously created URL

//exporting the router
module.exports = router;