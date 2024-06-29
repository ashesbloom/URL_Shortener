const express = require('express');
const router = express.Router();
//importing the user controller functions
const {handleUsers_SighUp,handleUsers_SignIn,handleUser_logout} = require('../controllers/userControl');

router.post('/',handleUsers_SighUp); //handling the signup request
router.post('/login',handleUsers_SignIn); //handling the login request
router.post('/logout',handleUser_logout); //handling the logout request

//exporting the router
module.exports = router;