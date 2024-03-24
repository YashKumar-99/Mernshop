const express = require('express');
const router = new express.Router();
const { SingupApi, ActivationApi, LoginApi, Authencation, getUserDetails ,updateUserProfile,updateUserProfilePic} = require('../controller/UserControllers');


const { createSeller, sendOtp, verifyOtp, sellerLogin, refresh, createProduct, tempProduct, getAllProduct, getSellerDetails } = require("../controller/sellerControllers");


const { convertionChat, sellerconvertion, conversationwihtsellers } = require('../controller/convertions.js');



const { messageChat, getAllMessages } = require('../controller/messages.js')

const authToken = require('../middleware/auth');
const authSeller = require('../middleware/authSeller.js')

const upload = require('../Multerpart/index')

const uploadseller = require('../Multerpart/sellerindex');

const productMulter = require('../Multerpart/productmulter.js')
const chatMulter = require('../Multerpart/chatmulter.js')






router.post('/user/register', upload.single('file'), SingupApi);
router.post('/user/activation', ActivationApi);
router.post('/user/login', LoginApi);


router.get('/user/authentication', authToken, Authencation);


router.get('/user/getuser', authToken, getUserDetails);
router.post('/user/updateUserProfile', authToken, updateUserProfile);
router.post('/user/updateUserProfilePic', authToken, upload.single('userProfile') ,updateUserProfilePic);


//Add seller router here


router.post('/seller/createSeller', uploadseller.single('file'), createSeller);
router.post('/seller/sendotp', sendOtp);
router.post('/seller/verifyOtp', verifyOtp);
router.post('/seller/login', sellerLogin);
router.get('/seller/refresh', refresh);
router.post('/seller/createProduct', productMulter.array(`productImage`, 12), createProduct);
router.post('/seller/temp', tempProduct);

router.get('/seller/getseller', authSeller, getSellerDetails);



router.get('/v1/api/products', getAllProduct);





router.post('/messages/save', chatMulter.single('file'), messageChat)
router.post('/messages/getAllMessages', getAllMessages)





//add convertion router




router.post('/convertion/create-new-conversation', convertionChat);
router.get('/convertion/sellerconvertion/:id', sellerconvertion);



router.get('/convertion/conversationwihtsellers/:id', conversationwihtsellers);






module.exports = router;




