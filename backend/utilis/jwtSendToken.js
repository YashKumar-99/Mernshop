//create the token and saving in the cookies

const sendToken = (user, statusCode, res) => {


    console.log(user, "user is here")

    const token = user.getJwtToken();
    console.log(token,"sendtoken")


    //options for cookies
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true // Use httpOnly, not http
    }



    console.log(options,"options")
    res.status(statusCode).cookie("token", token, options).json({ success: true, user, token })
}



module.exports = sendToken;



