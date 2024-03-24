
const crypto = require('crypto');
const screateKey = "writeyourscreatekey"

const sendMail = require('../utilis/sendMail')

const seller = require('../models/Seller.js');

const product = require('../models/Product.js')
const imagevar = require('../models/image.js')


const cookie = require('cookie-parser')

const jwt = require('jsonwebtoken');

const fs = require('fs');
const axios = require('axios');

const outputPath = `uploads/abcd/${Date.now()}.jpeg`;


const sendOtp = async (req, res) => {



    const { email, password } = req.body;


    if (!email || !password) {
        res.json({ message: "Please fill all credientails ..!!" });
        return;
    }




    //create 6 digit otp


    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp, "otp is..!!");

    const ttl = 5 * 60 * 1000;


    const expires = Date.now() + ttl;

    const data = `${email}.${otp}.${expires}`;

    console.log(data, "full data");

    const hash = crypto.createHmac('sha256', screateKey).update(data).digest('hex');


    const fullhash = `${hash}.${expires}`

    console.log(fullhash, "full  hash is ")

    // console.log("sendotp", email, password);
    // res.send("called sendotp!!");

    try {


        await sendMail({
            email: email,
            subject: "Activate you account !!",
            message: `Hello ${email} ,Your verifcattion  opt is : ${otp}  `
        })

        res.json({ email, fullhash })


    } catch (error) {

        console.log(error, "error occured!!")

    }





}


const verifyOtp = (req, res) => {


    console.log(req.body, "reqbody")
    const { email, fullhash, otp } = req.body;

    const [hashdata, expires] = fullhash.split('.');


    let now = Date.now();


    if (now > parseInt(expires)) {

        return res.status(504).send({ msg: 'Timeout ,Please try again later..!!' })


    }


    const data = `${email}.${otp}.${expires}`;

    const newHash = crypto.createHmac('sha256', screateKey).update(data).digest('hex');

    console.log(newHash, "vs", hashdata);


    if (newHash === hashdata) {
        console.log("User is verified !!");

        res.send("verify complate");








    }










    // console.log(email, fullhash, otp, "thisis");






}





const createSeller = async (req, res) => {





    const { name, phone, address, zip, email, password } = req.body;

    // console.log(req.file, "ddfdsgasgewdgwf");

    const { filename } = req.file;






    if (!name || !phone || !address || !zip || !email || !password || !filename) {
        return res.status(201).send("All data are not filled !!")
    }


    const sellerCreated = await seller.create({
        name, email, password, imagepath: filename

        , address, zip, phone
    })


    // console.log("reqbody is", req.body);

    // console.log(req.file, "req files is")

    console.log("hello world form  createSeller", sellerCreated);
    res.status(201).send({ msg: "Seller created successfully ", sellerCreated });



}

// console.log("Heythis....!!", seller)


const sellerLogin = async (req, res) => {


    const { email, password } = req.body;


    if (!email || !password) {

        return res.status(403).send("Data is not availabe !!")
    }


    try {

        const findUser = await seller.findOne({ email });

        if (!findUser) {
            return res.send({ msg: "User is not  found please login again or register if you do not have already accound !!" })

        }

        // const isPasswordValid = await user.comparePassword(password)





        const IsmatchedPassword = await findUser.comparePassword(password); //The value will true or false;



        if (!IsmatchedPassword) {


            console.log("Seller is not authrized !!");
            res.send("Seller is not authrized please login to continue !!");

        } else {

            const Id = findUser._id;

            const accessToken = jwt.sign({ Id }, process.env.JWT_SELLER_ACCESS_TOKEN, {

                expiresIn: '5m'

            })

            const RefershToken = jwt.sign({ Id }, process.env.JWT_SELLER_REFRESH_TOKEN, {

                expiresIn: '1y'

            })

            const accessTokenExpiration = new Date(Date.now() + 30 * 1000); // 5 minutes
            const refreshTokenExpiration = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year


            console.log(accessToken, "and", RefershToken);


            res
                .cookie('accessToken', accessToken, {
                    expires: accessTokenExpiration,
                    httpOnly: true,
                    sameSite: 'strict'
                })
                .cookie('refreshToken', RefershToken, {
                    expires: refreshTokenExpiration,
                    httpOnly: true,
                    sameSite: 'strict'
                })


                .cookie('accessTokenID', true, { expires: new Date(new Date().getTime() + 30 * 1000), sameSite: 'strict' })
                .cookie('refreshTokenID', true, {
                    expires: new Date(new Date().getTime() + 31557600000),
                    sameSite: 'strict'
                })
                .send("seller login varificaition complate..!")


        }






    } catch (error) {

        console.log(error, "error in the seller login..!!")

    }





}



const refresh = (req, res, next) => {


    const refreshToken = req.cookies.refreshToken;

    // console.log(req,"request  is this...!!")
    // const refreshToken= req.headers.cookie;
    // const {refreshToken}=abc;


    // console.log(refreshToken, "Here is all cookies..!!")

    if (!refreshToken) {

        return res.json({ msg: "Token is not found please go to login" })

    } else if (refreshToken) {

        jwt.verify(`${refreshToken}`, process.env.JWT_SELLER_REFRESH_TOKEN, function (err, seller) {

            if (err) {
                return res.status(500).send({ massage: err })
            }


            if (seller) {


                //Please do access kay and 

                const Id = seller.Id;

                const accessToken = jwt.sign({ Id }, process.env.JWT_SELLER_ACCESS_TOKEN, {
                    expiresIn: '5m'
                })


                res.cookie('accessToken', accessToken, {
                    expires: new Date(new Date().getTime() + 30 * 1000),
                    httpOnly: true,
                    sameSite: 'strict'


                })
                    .cookie('accessTokenID', true, { expires: new Date(new Date().getTime() + 30 * 1000), sameSite: 'strict' })

                    .send("seller is authrized !!")

                // console.log(accessToken, "accesstoken,,")





            }

            next();
        });











        // res.send("token created!!")




    }


}




const createProduct = async (req, res) => {


    // console.log("Heytis", req.files)



    const imagePaths = req.files.map((file) => ({ path: file.path }));

    console.log(imagePaths, "imagepaths...!!!");

    const savedImages = await imagevar.create(imagePaths);

    console.log(savedImages, "saveImages...!!!")



    //   ab.then((res)=>res.save());


    // imageschema.save();






    const { accessToken } = req.cookies;
    // console.log(req.cookies, "accessToken issssss!!")

    if (!accessToken) {

        return res.send('user Is not valid or please logout your other seller accout first');
    }


    // console.log(accessToken, "Token")

    const sellerHere = jwt.verify(accessToken, process.env.JWT_SELLER_ACCESS_TOKEN)

    const { Id } = sellerHere;

    // console.log(Id, "Id")

    const sellerShop = await seller.findOne({ _id: Id });






    // console.log(sellerShop, "seller token is  here...");


    if (!sellerShop) {


        return res.status(501).json({ massage: 'seller is not authrozied....!!' })
    }


    const { name,
        description,
        category,
        tag,
        orignalPrice,
        pricewithdiscount,
        stock


    } = req.body;


    // console.log(req.file);

    // console.log(tag, "tagishere..")

    // const { filename } = req.file;

    // if (productImage) {

    //     productMulter.single(productImage)



    // }


    if (!name || !description || !category || !orignalPrice || !pricewithdiscount || !stock) {

        return res.json({ msg: 'Please fill the all filed!!' })

    }



    const tagArray = JSON.parse(tag);


    const createdProduct = await product.create({
        name,
        shopId: Id,
        description,
        category,
        tag: tagArray,
        orignalPrice,
        pricewithdiscount,
        stock,


    })

    createdProduct.productImage = savedImages.map(image => image._id);
    await createdProduct.save();



    // await product.save();





    // console.log(resultHere, "ResisHere..!!");

    return res.status(201).json({ message: 'Product created sucessfully !!' })



    // res.send(resultHere,'product created!!');








}

const tempProduct = async (req, res) => {
    console.log(req.body);

    const { shopId, name, description, category, orignalPrice, pricewithdiscount, stock, productImage } = req.body;


    let productImageArr = [];
    const imagePromises = productImage.map(async (item, index) => {
        const outputPath = `uploads/abcd/${shopId}_${index}_${Date.now()}.jpeg`;

        try {
            const response = await axios.get(item, { responseType: 'arraybuffer' });
            fs.writeFileSync(outputPath, Buffer.from(response.data, 'binary'));

            productImageArr.push({ "path": outputPath });

            console.log(item, 'Image saved successfully:', outputPath);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    });
    // Wait for all promises to resolve before continuing
    await Promise.all(imagePromises);
    console.log(productImageArr, "productImageArr")
    await product.create({

        shopId, name, description, category, orignalPrice, pricewithdiscount, stock, productImage: productImageArr

    })

    productImageArr = [];
    res.send('hello world !!');
};



const getAllProduct = async (req, res) => {



    console.log("productess");

    const data = await product.find().populate('productImage');
    // console.log(data, "hhhhhh")

    res.status(201).json(data);



}



const getSellerDetails = async (req, res) => {

    console.log(req.seller);
    const { Id } = req.seller;


    const findseller = await seller.findById({ _id: Id });
    if (!findseller) {
        res.send('seller is not  found, Please login to continue');
    }


    console.log(findseller, "se;;er")

    res.status(201).json({ findseller });
}

module.exports = { createSeller, sendOtp, verifyOtp, sellerLogin, refresh, createProduct, tempProduct, getAllProduct, getSellerDetails };

