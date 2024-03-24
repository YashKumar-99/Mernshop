import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';
import ChatBox from '../UserLayout/views/ChatBox';

const InboxChat = () => {

    const [converationUsers, setConverationUser] = useState(null);

    const { authuser } = useSelector((store) => store.authUser);

    const foundUserId = useSelector((store) => store?.authUser?.data?._id);
    console.log(foundUserId, "helos")



    async function conversationwihtsellers() {
        const conversationRes = await axios.get(`/convertion/conversationwihtsellers/${foundUserId}`);

        setConverationUser(conversationRes.data);

    }
    useEffect(() => {

        if (authuser) {

            conversationwihtsellers();



        }
        // console.log(authuser, "authuserd")

    }, [])


    return (
        <>
            <div>

            <h1 style={{ textAlign: 'center' , margin:'0' ,backgroundColor:'#282c34' ,padding:'2%',color:'#fff'}}>All Sellers</h1>
                {
                    converationUsers?.conversation?.map((item) => {


                        if (!item.userimage.startsWith("seller/")) {
                            item.userimage = `seller/${item.userimage}`;
                        }
                        return (
                            <ChatBox key={item._id} data={item} />
                        );
                    })
                }
            </div>

        </>


    )
}

export default InboxChat
