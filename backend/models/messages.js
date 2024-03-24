const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({


    // conversationId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Conversation', // This should match the model name of your Seller schema
    //     // required: true
    // },

    conversationId: {
        type: String
    },
    msg: {
        type: String
    },
    sender: {
        type: String
    },
},
    { timestamps: true }
)
module.exports = mongoose.model("Messages", messagesSchema);

