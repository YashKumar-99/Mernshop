const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//Create a mongoDb Schema for the user

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // Adding a custom validation for email format
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,


    },

    password: {
        type: String,
        required: true
    },

    imagePath: {
        type: String,
        required: true
    },

    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    dob: {
        type: String,

    }

})







//jwt token

// jwt token
UserSchema.methods.getJwtToken = function () {


    // console.log("getJwtToken enterd!!")
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });

};






//Hash the password before saving it to the databse
UserSchema.pre('save', async function (next) {

    if (!this.isModified("password")) {
        next();
    }


    try {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.log(error, "error occured  d in password save !!");
        next(error);
    }
})


UserSchema.methods.comparePassword = async function (enterdpassword) {

    console.log("entered in user compare fun!!")
    return await bcrypt.compare(enterdpassword, this.password)

}


module.exports = mongoose.model("User", UserSchema);
