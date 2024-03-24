import React, { useState, useEffect } from 'react';
import ChatBox from './xChatBox';


import { useSelector } from 'react-redux';

import axios from 'axios';

const ChatBoxSec = () => {





    const lastMessagedata = useSelector((store) => store?.chat?.messageArr);

    const last = lastMessagedata[lastMessagedata.length - 1];

    console.log(last, "lslslslsls", lastMessagedata.length);


    if (last) {

        var { sender, msg ,conversationId} = last
    }

    console.log(sender,msg,conversationId,"conversationIdconversationId")

    // const { sender, msg } = last




    // useEffect(()=>{

    //     console.log(lastMessagedata,"lsmmm")

    // },[lastMessagedata])



    // console.log(lastMessagedata[lastMessagedata.length - 1], "lsttt",lastMessagedata);

    // const newobj = lastMessagedata[lastMessagedata.length - 1]

    // console.log(newobj, "newob")

    // if (newobj !== null) {
    //     var { converstionId, msg } = newobj || {};

    // }








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