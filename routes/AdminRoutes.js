const express = require('express');
const router = express.Router(); 
//importing the admin controller functions
const {handleAdminClicks,handleAdminAllUrls,handleAdminRemoveUser, handleAdminAllUsers} = require('../controllers/adminControl.js');

router.get('/',handleAdminAllUrls);  //getting all the urls created by the users and redirecting to admin page
router.get('/statistics/:id',handleAdminClicks); //getting Url statistics and redirecting to the Admin statistics page
router.get('/allusers',handleAdminAllUsers); //getting all the users and redirecting to the Admin users page
router.post('/delete',handleAdminRemoveUser);//deleting a user

//exporting the router
module.exports = router;