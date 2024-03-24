const Messages = require('../models/messages');
const Convertion = require('../models/conversation');

// Route to save messages received from the frontend
// const messageChat = async (req, res) => {
//     try {
//         const { roomId, msg, senderId } = req.body;

//         // Create a new message document
//         const newMessage = new Messages({
//             conversationId: roomId, // Assuming conversationId corresponds to groupTitle
//             msg: msg, // Message text
//             sender: senderId // Sender ID
//         });

//         // Save the message to the database
//         await newMessage.save();

//         console.log("Message saved to the database:", newMessage);

//         res.status(201).json({ success: true, message: newMessage });
//     } catch (error) {
//         console.error('Error saving message:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


// Modify your messageChat function to update lastMessage in conversation
const messageChat = async (req, res) => {
    try {
        const { roomId, msg, senderId, file } = req.body;




        console.log(file, "here is file")

        // Create a new message document
        const newMessage = new Messages({
            conversationId: roomId, // Assuming conversationId corresponds to groupTitle
            msg: msg, // Message text
            sender: senderId // Sender ID
        });

        // Save the message to the database
        await newMessage.save();

        // Update lastMessage in conversation
        await Convertion.findOneAndUpdate({ groupTitle: roomId }, { lastMessage: msg }, { new: true });



        console.log("Message saved to the database:", newMessage);

        res.status(201).json({ success: true, message: newMessage });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};





const getAllMessages = async (req, res) => {

    const { groupTitle } = req.body;

    try {

        const getMessages = await Messages.find({ conversationId: groupTitle }).select('msg sender')

        console.log(getMessages, "resultis here!!")
        res.status(201).json({ success: true, getMessages })

    } catch (error) {

        console.log(`we got some error and error is:${error}`)

    }

}

module.exports = { messageChat, getAllMessages };
