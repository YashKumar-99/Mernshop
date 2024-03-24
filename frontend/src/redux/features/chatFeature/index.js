import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    chatstatus: true,
    messageArr: [],
    loading: false,
    error: null,
    lastMessage: null,
    messageCount: {}, // New field to store message count for each group

   

};

const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessageArr: (state, action) => {
            state.messageArr = action.payload;
        },
        feaMessageArr: (state, action) => {
            console.log(action.payload, "pay")
            state.messageArr = [...state.messageArr, action.payload];
        },


        lastMessage: (state, action) => {
            state.lastMessage = action.payload;

        },
        fetchMessagesStart: (state) => {
            state.loading = true;
            state.error = null;

        },
        fetchMessagesSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.messageArr = action.payload;

        },
        fetchMessagesFailure: (state) => {
            state.loading = false;
            state.error = true;
        }

        ,
        setConversationUsers: (state, action) => {
            state.conversationUsers = action.payload;
        },

       

      

      


    }
});

export const { setMessageArr, feaMessageArr, lastMessage, fetchMessagesStart, fetchMessagesSuccess, fetchMessagesFailure, setConversationUsers,  } = ChatSlice.actions;

export default ChatSlice.reducer;
