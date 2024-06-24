const jwt = require('jsonwebtoken');
const key = "@This_should_be_a_secret@"

function setUser(user){
    const payload = {
        _id : user._id,
        email: user.email,
        name: user.name,
        role:user.role
    };
    return jwt.sign(payload,key);
}

function getUser(token){
    if(!token) return null; //when middleware runs and request 'getuser' with null token which crashes server to prevent we use if
    try{
        return jwt.verify(token,key);
    }catch(error){              //In case of cookies modification we pass null to prevent server from crashing
        console.log(error);
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}
