const users = require('../models/users');
const {setUser} = require('../service/auth.js');

async function handleUsers_SighUp(req,res){
    const {name , email , password} = req.body;
    await users.create({
        name,
        email,
        password,
        role: 'USER'
    });
    return res.redirect('/signin');
}

async function handleUsers_SignIn(req,res){
    const {email,password} = req.body;
    const isUser = await users.findOne({email,password});
    if(isUser){
        const token = setUser(isUser);
        res.cookie("token",token);
        res.redirect('/home');
    }else{
        return res.redirect('/signin');
    }
    
}

function handleUser_logout(req,res){
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully', redirect: '/signin' });
}


module.exports = {
    handleUsers_SighUp,
    handleUsers_SignIn,
    handleUser_logout
}