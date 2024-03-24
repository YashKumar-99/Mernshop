const Convertion = require('../models/conversation');
const express = require('express');
const router = express.Router();

const User = require('../models/User')

const seller = require('../models/Seller')


const dummyconvertionchat = async (req, res) => {

    try {
        console.log(req.body, "here is the reqbody reqbody reqbody reqbody");

        const { groupTitle, userId, shopId } = req.body;
        const isConversationExist = await Convertion.findOne({ groupTitle });
        console.log(isConversationExist, "ice")
        if (isConversationExist) {
            const conversation = isConversationExist;
            console.log('entered !!')
            res.status(201).json({
                success: true,
                conversation,
            });

        } else {
            const conversation = await Convertion.create({
                members: [userId, shopId],
                groupTitle: groupTitle,
            });

            console.log(conversation, "conver...!!")

            // await conversation.save();
            res.status(201).json({
                success: true,
                conversation
            })
        }
    } catch (error) {
        console.log(error, "getting error")
    }
}




const convertionChat = async (req, res) => {

    try {
        console.log(req.body, "here is the reqbody reqbody reqbody reqbody");

        const { groupTitle, userId, shopId } = req.body;
        const isConversationExist = await Convertion.findOne({ groupTitle });
        console.log(isConversationExist, "ice")
        if (isConversationExist) {
            const conversation = isConversationExist;
            console.log('entered !!')
            res.status(201).json({
                success: true,
                conversation,
            });

        } else {
            const conversation = await Convertion.create({
                members: [userId, shopId],
                groupTitle: groupTitle,
            });

            
            console.log(conversation, "conver...!!")

            // await conversation.save();
            res.status(201).json({
                success: true,
                conversation
            })
        }
    } catch (error) {
        console.log(error, "getting error")
    }
}



const sellerconvertion = async (req, res) => {
    const sellerId = req.params.id;

    if (sellerId) {
        try {
            // Find conversations where the seller's ID is included in the members array
            // const conversationsres = await Convertion.find({ members: sellerId }).select('groupTitle members');


            const conversationRes = await Convertion.find({ members: sellerId }).lean();

            for (const conversation of conversationRes) {
                const memberId = conversation.members[0]; // Assuming the first member is the user ID
                const senderId=conversation.members[1];

                // Check if the user exists
                const user = await User.findById(memberId);

                console.log(user,"useridhere")

                // If the user exists, add their details to the conversation result
                if (user) {
                    conversation.username = user.name;
                    conversation.userimage = user.imagePath;
                    conversation.reciverId=user._id;

                    conversation.senderId=senderId

                }
            }

            console.log(conversationRes, "conversationResconversationRes");



            return res.status(200).json({ conversation: conversationRes });




        } catch (error) {
            console.error('Error fetching conversations:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // console.log("entered!!");
    // console.log(sellerId, "Seller ID");
    // res.send('sellerId');
}



const conversationwihtsellers = async (req, res) => {
    const userId = req.params.id;
    console.log(userId, "useridd")

    if (userId) {
        try {
            // Find conversations where the seller's ID is included in the members array
            // const conversationsres = await Convertion.find({ members: sellerId }).select('groupTitle members');


            const conversationRes = await Convertion.find({ members: userId }).lean();






            for (const conversation of conversationRes) {
                const memberId = conversation.members[1]; // Assuming the first member is the user ID
                const senderId=conversation.members[0];

                console.log(memberId, "memeberIDD")

                // Check if the user exists
                const Isseller = await seller.findById(memberId);

                console.log(Isseller, "isselller")



                // If the user exists, add their details to the conversation result
                if (Isseller) {
                    console.log(Isseller.name, "issellername")
                    conversation.username = Isseller.name;
                    conversation.userimage = Isseller.imagepath;
                    conversation.reciverId=Isseller._id;

                    conversation.senderId=senderId

                }
            }

            console.log(conversationRes, "conversationResconversationRes");



            return res.status(200).json({ conversation: conversationRes });




        } catch (error) {
            console.error('Error fetching conversations:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // console.log("entered!!");
    // console.log(sellerId, "Seller ID");
    // res.send('sellerId');
}




module.exports = { convertionChat, sellerconvertion, conversationwihtsellers };
