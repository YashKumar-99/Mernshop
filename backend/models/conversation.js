const mongoose = require("mongoose");
const conversartionSchema = new mongoose.Schema({
    groupTitle: {
        type: String,
    },
    members: {
        type: Array
    },
    lastMessage: {
        type: String
    },
    lastMessageId: {
        type: String
    },
    
},
    { timestamps: true }
)

module.exports = mongoose.model("Conversation", conversartionSchema)