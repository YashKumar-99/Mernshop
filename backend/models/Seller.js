const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        trim: true
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
    imagepath: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true
    },


})







//Match Password


// sellerSchema.methods.comparePassword = async function (enteredpassword) {


//     console.log("entered campare password !!")
//     return await bcrypt.compare(enteredpassword, this.password)


// }
 







//Hash password before saving it in the database



sellerSchema.pre("save", async function (next) {


    if (!this.isModified("password")) {

        next();

    }

    try {
        const saltRound = 10;

        const salt = await bcrypt.genSalt(saltRound);

        const hashpassword = await bcrypt.hash(this.password, salt);

        this.password = hashpassword;

        next();

    } catch (error) {

        console.log(error, "error occured in sellerSchema !!");
        next(error);



    }






})





sellerSchema.methods.comparePassword = async function (enterdpassword){

    console.log("entered in user compare fun!!")
    return await bcrypt.compare(enterdpassword,this.password)

}



module.exports = mongoose.model("seller", sellerSchema);