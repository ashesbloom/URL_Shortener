const users = require('../models/users');

async function handleUsers_SighUp(req,res){
    const {name , email , password} = req.body;
    await users.create({
        name,
        email,
        password
    });
    return res.redirect('/home/'+name);
}


async function handleUsers_SignIn(req,res){
    const {email,password} = req.body;
    const isUser = await users.findOne({email,password});
    if(isUser){
        res.redirect('/home/'+isUser.name);
    }else{
        return res.render('signin',{
            error:'Invalid! email or password'
        });
    }
}


// async function userHomepage(req,res){
//     return res.render('home');
// }
module.exports = {
    handleUsers_SighUp,
    handleUsers_SignIn,
}