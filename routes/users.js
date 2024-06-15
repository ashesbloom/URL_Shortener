const express = require('express');
const router = express.Router();
const {handleUsers_SighUp,handleUsers_SignIn} = require('../controllers/users');

router.post('/',handleUsers_SighUp);
// router.get('/:UserName',userHomepage);
router.post('/login',handleUsers_SignIn);

module.exports = router;