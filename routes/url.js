const express = require('express');
const router = express.Router();
const { GenrateShortUrl,handleAdminClicks,handleAdmin} = require('../controllers/url.js');

router.post('/',GenrateShortUrl);

router.get('/admin/:id',handleAdminClicks);

router.get('/admin',handleAdmin);

module.exports = router;