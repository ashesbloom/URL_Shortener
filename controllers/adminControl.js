const URL = require('../models/url'); //importing the URL model
const Users = require('../models/users.js'); //importing the Users model

async function handleAdminAllUrls(req,res){ //path: /admin/
    const result = await URL.find({}); //getting all the entries from the database
    //getting all the users who created the urls by createdBy field
    const users = await Users.find({ _id: { $in: result.map(item => item.createdBy) } }); 
    //formatting the data to display in the frontend
    const formattedData = result.map(item => ({ 
        shortId: item.shortId, 
        redirectURL: item.redirectURL,
        //mapping user name with their urls
        createdBy: users.find(user => user._id.toString() === item.createdBy.toString())?.name
    }));

    const urls = await URL.find({createdBy:req.user._id}); //fetching the urls created by the logged-in user only
    return res.render('home',{
        data:urls,
        allurls: formattedData,
        role:req.user.role,
        userName: req.user.name
    });
}

async function handleAdminClicks(req,res){ //path: admin/statistics/:id
    const shortId = req.params.id; //getting the shortID from the URL
    const result = await URL.findOne({shortId}); //searching for the shortID in URL collection
    const createdBy = result.createdBy; //getting the createdBy field from the URL collection to get the user details
    const user = await Users.findOne(createdBy); //getting the user details from the Users collection
    return res.render('AdminStatistics',{ //rendering the AdminStatistics page with variables
        Url: result.redirectURL,
        shortid:shortId,
        Totalclicks: result.visitTime.length,
        createdBy: user?.name,
        email: user.email,
        role: user.role
    });
}

async function handleAdminRemoveUser(req,res){ //path: /admin/delete
    const userMail = await req.headers.email; //getting the email from the headers sent from the frontend (handleAction.js)
    const isUser = await Users.findOneAndDelete({email: userMail}); //searching for the user in the Users collection and deleting it
    if(isUser){//if user exists
        await URL.deleteMany({createdBy:isUser._id}); //deleting all the urls created by the user
        
        return res.json({message:'User has been deleted!',redirect: '/ashes/home'});//redirecting to the homepage
    }else{
        console.error('Error while deleting');
        return res.status(404).send('User does not exist'); // sending 500 Internal Server Error in case of any other error
    }
}

async function handleAdminAllUsers(req,res){ //path: /admin/allusers
    try {
        const names = await Users.find({}); //fetching all the users from the Users collection
        const formattedData = names.map(item => ({//formatting the data to display in the frontend
            userName: item.name,
            email: item.email,
            role: item.role,
            createdAt: item.createdAt.toLocaleString('en-GB', { //converting the date to a readable format
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            })
        }));
        res.render('AdminUser', { formattedData }); //rendering the AdminUser page with the formatted data
    } catch (error) { //sending Internal Server Error in case of any error
        res.status(500).send('Error fetching user data');
    }
}

//exporting the functions
module.exports = {
    handleAdminAllUrls,
    handleAdminClicks,
    handleAdminRemoveUser,
    handleAdminAllUsers
}