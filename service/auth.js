//importing the jsonwebtoken module to create and verify the token for user authentication (https://www.npmjs.com/package/jsonwebtoken)
const jwt = require('jsonwebtoken'); 
const key = "@This_should_be_a_secret@" //secret key to create the token (should be kept secret)

//function to create a token for the user
// https://jwt.io/ (to decode the token)
function setUser(user){
    const payload = { //payload(information) to be stored in the token
        _id : user._id,
        email: user.email,
        name: user.name,
        role:user.role
    };
    return jwt.sign(payload,key); //returning the token 
}

 //function to get the user from the token
function getUser(token){
    if(!token) return null; //when middleware runs and request 'getuser' with null token which crashes server to prevent we use pass null
    try{
        return jwt.verify(token,key); //verifying the token and returning the user
    }catch(error){  
        console.log(error);
        return null; //In case of cookies modification we pass null to prevent server from crashing
    }
}

//exporting the functions
module.exports = {
    setUser,
    getUser
}
