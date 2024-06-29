const {getUser} = require('../service/auth.js'); //importing the getUser function from auth.js


function Authorization(roles = []){ //to check if the user is authorized or not!
    return function (req,res,next){ //middleware function
        const token = req.cookies?.token; //extracting the token from the cookies
        if(!token) return res.redirect('/ashes/signin');//if token is not present redirect to signin page

        const User = getUser(token); //getting the user from the token
        if(!User) return res.redirect('/ashes/signin'); //if user is not present redirect to signin page
        
        req.user = User; //storing the user in the req object for further use
        if(!roles.includes(req.user.role)) return res.end('UnAuthorized');//if the user role is not in the roles array then return unauthorized
        
        return next();//if the user is authorized then move to the next middleware
    }
};

async function UserAuthentication(req,res,next){  // to check if the user is valid or not! and store the information in req.user
    const token = req.cookies?.token; //extracting the token from the cookies
    const User = getUser(token);//getting the user from the token
    req.user = User;//storing the user in the req object for further use
    return next(); //moving to the next middleware
}

//exporting the functions
module.exports = {
    Authorization,
    UserAuthentication
}