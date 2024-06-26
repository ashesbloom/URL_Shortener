const users = require('../models/users.js');
const {setUser} = require('../service/auth.js');

async function handleUsers_SighUp(req,res){
    const {name , email , password} = req.body;
    try {
        //if a user with the same email already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already in use');
        }
        // Create new user
        const newUser = await users.create({
            name,
            email,
            password,
            role: 'USER'
        });
        // Generate token and set cookie
        const token = setUser(newUser);
        res.cookie("token", token);
        return res.redirect('/ashes/home');
    } catch (error) {
        console.error('Error during user sign-up:', error);
        return res.status(500).send('Internal server error');
    }
}

async function handleUsers_SignIn(req,res){
    const {email,password} = req.body;
    const isUser = await users.findOne({email,password});
    if(isUser){
        const token = setUser(isUser);
        res.cookie("token",token);
        return res.redirect('/ashes/home');
    }else{
        return res.redirect('/ashes/signin');
    }
    
}

function handleUser_logout(req,res){
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully', redirect: '/ashes/signin' });
}


module.exports = {
    handleUsers_SighUp,
    handleUsers_SignIn,
    handleUser_logout
}