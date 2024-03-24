const ErrorHandler = require('../utilis/ErrorHandler');

const catchAsyncErrors = require('./catchAsyncErrors');

const jwt = require('jsonwebtoken');


const seller=require('../models/Seller')



function authToken(req, res, next) {


    console.log("consoleis here...!!")

    const token = req.cookies.accessToken;


    console.log(token,"thisishere..")




    
    if (token === false || token == undefined ) {
        return res.status(201).json({ auth: false, message: 'Please login to continue..!!' })

    }



    console.log("checking...")
    const ValidUser = jwt.verify(token, process.env.JWT_SELLER_ACCESS_TOKEN);

    console.log(ValidUser, "validuser")


    if (!ValidUser) {
        res.status(201).json({ auth: false, message: 'Please login to continue..!!' })
        next();
    }
    else {
        console.log("entered!!")
        req.seller = ValidUser
        next()
    }



}


module.exports = authToken;