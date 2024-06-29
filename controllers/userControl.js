const users = require('../models/users.js'); //importing the user model
const {setUser} = require('../service/auth.js'); //importing the setUser function from auth.js(service)

async function handleUsers_SighUp(req,res){
    const {name , email , password} = req.body; //extracting the data from the html form
    try {
        //if a user with the same email already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) { //redirecting to the signup page with error message
            return res.status(400).render('signup',{error:'Email already in use'}); 
        }
        // Creating a new user
        const newUser = await users.create({
            name,
            email,
            password,
            role: 'USER'
        });

        // Generating a token and passing it to the user as a cookie
        const token = setUser(newUser); 
        res.cookie("token", token); 

        return res.redirect('/ashes/home');//redirecting to the home page

    } catch (error) { //if any error occurs
        console.error('Error during user sign-up:', error);
        return res.status(500).send('Internal server error');
    }
}

async function handleUsers_SignIn(req,res){
    try{
        const {email,password} = req.body; //extracting the data from the html form
        const isUser = await users.findOne({email,password}); //validating the user from users collection

        if(isUser){ //if user is valid
            const token = setUser(isUser); //generating a token
            res.cookie("token",token); //passing the token as a cookie
            return res.redirect('/ashes/home');//redirecting to the home page
        }else{
            //redirecting to the signin page with error message
            return res.status(404).render('signin',{error:'Invalid Credentials!'});//
        }
    }catch(error){//if any error occurs
        console.error({'error while sign In':error});
        return res.status(500).send('Internal server error');
    }
    
}

function handleUser_logout(req,res){
    res.clearCookie('token'); //clearing the token cookie
    res.json({ message: 'Logged out successfully', redirect: '/ashes/signin'}); //redirecting to the signin page
}

//exporting the functions
module.exports = {
    handleUsers_SighUp,
    handleUsers_SignIn,
    handleUser_logout
}