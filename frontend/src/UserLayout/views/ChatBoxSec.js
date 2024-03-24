import React, { useState, useEffect, useRef } from 'react';
import ChatBox from './ChatBox';
import axios from 'axios';

const ChatBoxSec = () => {
    const [conversationUsers, setConversationUsers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch seller ID
                const sellerRes = await axios.get('/seller/getseller');
                const foundSellerId = sellerRes?.data?.findseller?._id;
                if (foundSellerId) {
                    // Fetch seller conversation if seller ID is available
                    const conversationRes = await axios.get(`/convertion/sellerconvertion/${foundSellerId}`);
                    setConversationUsers(conversationRes.data);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

   

    return (
        <div>
            <h1 style={{ textAlign: 'center' , margin:'0' ,backgroundColor:'#282c34' ,padding:'2%',color:'#fff'}}>All Users</h1>
            {conversationUsers?.conversation?.map((item) => (
                <ChatBox key={item._id} data={item} />
            ))}
        </div>
        
    );
};

export default ChatBoxSec;
