const express = require('express');
const router = express.Router();
const {handleUsers_SighUp,handleUsers_SignIn,handleUser_logout} = require('../controllers/users');

router.post('/',handleUsers_SighUp);
router.post('/login',handleUsers_SignIn);
router.post('/logout',handleUser_logout);

module.exports = router;