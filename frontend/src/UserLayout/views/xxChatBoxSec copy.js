import React, { useState, useEffect } from 'react';
import ChatBox from './ChatBox';

import { useSelector } from 'react-redux';

import axios from 'axios';




const ChatBoxSec = () => {


    const [sellerId, setSellerId] = useState('');
    const [converationUsers, setConverationUser] = useState(null);
    console.log(converationUsers, 'entered in the ChatBoxSec!!')






    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch seller ID
                const sellerRes = await axios.get('/seller/getseller');
                const foundSellerId = sellerRes?.data?.findseller?._id;
                if (foundSellerId) {
                    // setSellerId(foundSellerId);

                    // Fetch seller conversation if seller ID is available
                    const conversationRes = await axios.get(`/convertion/sellerconvertion/${foundSellerId}`);
                    console.log(conversationRes.data, 'Seller Conversation Data');
                    setConverationUser(conversationRes.data);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    // console.log(converationUsers,lastMessagedata, "conversationUser will be there..")


    const setMessage = () => {
        console.log('getdata...!!')


    }



    return (
        <div>


            {/* {converstionId } and {msg} */}
            <h1 style={{ textAlign: 'center' }}>All Users</h1>
            {
                converationUsers?.conversation?.map((item) => {


                    return (


                        <ChatBox key={item._id} data={item} />
                    );










                })
            }
        </div>
    );
};

export default ChatBoxSec;