const express = require('express');
const router = express.Router();
const { GenrateShortUrl,handdleRedirectUrl } = require('../controllers/url.js');

router.post('/',GenrateShortUrl);

router.get('/:shortId',handdleRedirectUrl);

module.exports = router;