const {getUser} = require('../service/auth.js');

function Authorization(roles = []){
    return function (req,res,next){
        const token = req.cookies?.token;
        if(!token) return res.redirect('/signin');

        const User = getUser(token);
        if(!User) return res.redirect('/signin');
        
        req.user = User;
        if(!roles.includes(req.user.role)) return res.end('UnAuthorized'); 
        return next();
    }
};

async function UserAuthentication(req,res,next){  // to check if the user is valid or not! and store the information in req.user
    const token = req.cookies?.token;
    const User = getUser(token);
    req.user = User;
    return next(); 
}

module.exports = {
    Authorization,
    UserAuthentication
}