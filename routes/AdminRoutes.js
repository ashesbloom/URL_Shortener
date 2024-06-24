const express = require('express');
const router = express.Router();
const {handleAdminClicks,handleAdmin} = require('../controllers/url.js');

router.get('/',handleAdmin);  //getting all the short URL's id and original URL

router.get('/:id',handleAdminClicks); //getting the total clicks on a short URL

module.exports = router;