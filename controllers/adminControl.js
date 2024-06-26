const URL = require('../models/url');
const Users = require('../models/users.js');

async function handleAdmin(req,res){ // /url/admin
    const result = await URL.find({}); //getting all the entries from the database
    const users = await Users.find({ _id: { $in: result.map(item => item.createdBy) } });
    const formattedData = result.map(item => ({
        shortId: item.shortId,
        redirectURL: item.redirectURL,
        createdBy: users.find(user => user._id.toString() === item.createdBy.toString()).name,
    }));
    const urls = await URL.find({createdBy:req.user._id}); 
    return res.render('home',{
        data:urls,
        allurls: formattedData,
        role:req.user.role,
        userName: req.user.name
    });
}

async function handleAdminClicks(req,res){ // /url/admin/:id
    const shortId = req.params.id; //getting the shortID from the URL
    const result = await URL.findOne({shortId}); //searching for the shortID in the database
    const createdBy = result.createdBy;
    const user = await Users.findOne(createdBy);
    return res.render('AdminStatistics',{
        Url: result.redirectURL,
        shortid:shortId,
        Totalclicks: result.visitTime.length,
        createdBy: user.name,
        email: user.email,
        role: user.role
    });
}

async function handleAdminRemoveUser(req,res){
    const userMail = await req.headers.email;
    const isUser = await Users.findOneAndDelete({email: userMail});
    if(isUser){
        await URL.deleteMany({createdBy:isUser._id});
        return res.json({message:'User has been deleted!',redirect: '/ashes/home'});
    }else{
        console.error('Error while deleting');
        return res.status(404).send('User does not exist'); // sending 500 Internal Server Error in case of any other error
    }
}

async function handleAdminAllUsers(req,res){
    try {
        const names = await Users.find({});
        const formattedData = names.map(item => ({
            userName: item.name,
            email: item.email,
            role: item.role,
            createdAt: item.createdAt.toLocaleString('en-GB', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            })
        }));
        res.render('AdminUser', { formattedData });
    } catch (error) {
        res.status(500).send('Error fetching user data');
    }
}

module.exports = {
    handleAdmin,
    handleAdminClicks,
    handleAdminRemoveUser,
    handleAdminAllUsers
}