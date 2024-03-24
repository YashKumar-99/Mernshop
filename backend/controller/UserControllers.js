const express = require("express");

const User = require('../models/User');

const jwt = require('jsonwebtoken');

const sendToken = require('../utilis/jwtSendToken');

const sendMail = require('../utilis/sendMail')




// console.log(User, "useristhis..!!")









exports.SingupApi = async (req, res) => {
    console.log('this  is singup api');
    const { name, email, password } = req.body;
    const { filename } = req.file;


    if (!name || !email || !password || !filename) {

        res.status('500').json({ message: 'Please fill the all fields..!!' })




    }


    if (email) {

        const IsEmail = await User.findOne({ email });

        if (IsEmail) {

            res.status(401).json({ message: `User already registered with ${email}` });

            return;
        }

        const createUser = {

            name: name,
            email: email,
            password: password,
            imagePath: filename
        }



        // const newUser = new User(createUser);

        // console.log(newUser, "You have created user", newUser)


        // const saveUser = await newUser.save();


        // return res.status(201).json({ message: saveUser })


        const activationToken = createActivationToken(createUser);

        const actiationUrl = `http://localhost:3000/activation/${activationToken}`;

        console.log(actiationUrl, "activationurllll")


        try {


            await sendMail({
                email: createUser.email,
                subject: "Activate you account !!",
                message: `Hello ${createUser.name} ,Please check the line active your account : ${actiationUrl}`
            })

            return res.status(201).json({ message: "Please check the email.." })



        } catch (error) {
            console.log(error, "error from usercontroller");


        }





    }

    console.log(name, email, password);

    console.log(req.file)
    // console.log(filename)



}



// create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};




//active user

exports.ActivationApi = async (req, res) => {

    try {

        console.log("Activation Api called !!")

        const { activation_token } = req.body;


        console.log(activation_token, "activation token is  here..")

        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);


        console.log(newUser, "newuser object is here...!!")


        if (!newUser) {


            return res.status(401).json({ message: "Token is invalied !!" })

        }

        const { name, email, password, imagePath } = newUser;

        console.log(name, email, password, imagePath, "descation data from here")

        let user = await User.findOne({ email });

        if (user) {
            return res.status(401).json({ message: "User already exits !!" })

        }







        const onceuser = User.create({
            name, email, password, imagePath
        });





        onceuser.then((resolvedValue) => {
            console.log(resolvedValue, "before send to token");
            sendToken(resolvedValue, 201, res);

        }).catch((error) => {
            console.error("Error:", error);
        });











    } catch (error) {

        console.log(error, "error occured!!")

    }



}



exports.LoginApi = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: "Please fill the all fileds." })
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "User does not exists" })
        }
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password in invalid!!' })
        };
        sendToken(user, 201, res);
    } catch (error) {
        console.log(error, "error in login api");

        return res.status(401).json({ message: error })
    }
}


exports.Authencation = async (req, res) => {

    console.log('hellow')


    const VerifyUser = req.user;

    const verifyUserByDb = await User.findById({ _id: VerifyUser.id })

    console.log(verifyUserByDb, "verifyUserByDb...");

    if (!verifyUserByDb) {

        res.status(201).json({
            auth: false,
            message: 'User is not valid, Please login again...'

        })
    }
    else {


        res.status(201).send({
            auth: true,
            message: 'User is valid',
            verifyUserByDb

        })


        // const findUser= await User.findOne({token.email})


    }


}

exports.getUserDetails = async (req, res) => {




    console.log(req.user, "usertoken");

    const { id } = req.user;

    console.log(id, "heytheresefse")




    const userDetails = await User.find({ _id: id });

    console.log("userDetails", userDetails);

    res.send(userDetails);

}












exports.updateUserProfile = async (req, res) => {
    try {
        const { updateData } = req.body;
        const { id } = req.user;

        // Find user details by id
        const userDetails = await User.findById(id);

        if (!userDetails) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user details with new data
        for (let key in updateData) {
            userDetails[key] = updateData[key];
        }

        // Save updated user details
        await userDetails.save();

        console.log("User details updated:", userDetails);
        res.status(201).json({ status: 200, userDetails });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ error: "An error occurred while updating user profile" });
    }
}


exports.updateUserProfilePic = async (req, res) => {
    try {
        const { id } = req.user;


        const { filename } = req.file;

        // Find user details by id
        const userDetails = await User.findById(id);

        if (!userDetails) {
            return res.status(404).json({ error: 'User not found' });
        }

        userDetails.imagePath = filename;

        await userDetails.save();

        console.log("User details updated:", userDetails);
        res.status(201).json({ status: 200, msg: 'image saved successfully !!' });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ error: "An error occurred while updating user profilePic" });
    }
}








module.exports = {
    SingupApi: exports.SingupApi,
    LoginApi: exports.LoginApi,
    ActivationApi: exports.ActivationApi,
    Authencation: exports.Authencation,
    getUserDetails: exports.getUserDetails,
    updateUserProfile: exports.updateUserProfile,
    updateUserProfilePic: exports.updateUserProfilePic,

};
