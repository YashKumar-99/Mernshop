const ErrorHandler = require('../utilis/ErrorHandler');

const catchAsyncErrors = require('./catchAsyncErrors');

const jwt = require('jsonwebtoken');

const User = require('../models/User')



function authToken(req, res, next) {


    console.log("consoleis here...!!")

    const token = req.cookies.token;


    console.log(token,"thisishere..")




    
    if (token === false || token == undefined ) {
        return res.status(201).json({ auth: false, message: 'Please login to continue..!!' })

    }



    console.log("checking...")
    const ValidUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log(ValidUser, "validuser")


    if (!ValidUser) {
        res.status(201).json({ auth: false, message: 'Please login to continue..!!' })
        next();
    }
    else {
        console.log("entered!!")
        req.user = ValidUser
        next()
    }



}


module.exports = authToken;