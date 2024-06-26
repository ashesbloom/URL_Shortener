const express = require('express');
const router = express.Router();
const {handleAdminClicks,handleAdmin,handleAdminRemoveUser, handleAdminAllUsers} = require('../controllers/adminControl.js');

router.get('/',handleAdmin);  //getting all the short URL's id and original URL
router.get('/statistics/:id',handleAdminClicks); //getting the total clicks on a short URL
router.get('/allusers',handleAdminAllUsers);
router.post('/delete',handleAdminRemoveUser);

module.exports = router;