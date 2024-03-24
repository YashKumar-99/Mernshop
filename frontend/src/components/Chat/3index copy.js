import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Typography, TextField } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { server } from '../../server';
import './index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ENDPOINT = 'http://localhost:4000/';

const Chat = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messageArr, setMessageArr] = useState([]);

    const [sendBoxHeight, setSendBoxHeight] = useState(null)

    const [user, setOnlineUsers] = useState(null);
    const location = useLocation();
    const { search } = location;
    const { state } = location;

    const chatRef = useRef();
    const sendboxRef = useRef();
    const { username, groupTitle, userimage, senderId, reciverId } = state || {};
    const roomId = search.slice(1);
    const socketRef = useRef(null);

    const saveMessagesToBackend = async (messages) => {
        try {
            await axios.post(`${server}messages/save`, { messages });
            console.log('Messages saved to the backend successfully');
        } catch (error) {
            console.error('Error saving messages to the backend:', error);
        }
    };

    useEffect(() => {
        socketRef.current = io(ENDPOINT);

        socketRef.current.on('connect', () => {
            socketRef.current.emit('joinRoom', { roomId: roomId });
        });

        socketRef.current.on('message', (msg) => {
            setMessageArr(prevMessages => [...prevMessages, msg]);
            scrollToBottom();
        });

        socketRef.current.on('messageList', ({ messages }) => {
            setMessageArr(messages);



            scrollToBottom();
        });

        socketRef.current.emit('login', { userId: senderId });


        return () => {


            socketRef.current.disconnect();
        };
    }, [roomId]);



    useEffect(() => {

        socketRef.current.on('activeuser', (data) => {


            setOnlineUsers(data)

        })


    }, [user])


    if (user) {
        var hasValue = Object?.values(user)?.includes(reciverId);

    }



    console.log(hasValue, "itemteimtemtie");


    useEffect(() => {


        setSendBoxHeight(sendboxRef.current.clientHeight)

    }, [])




    // user.map((item)=>{
    //     console.log(item,"sdsd")
    // })





    // Function to smoothly scroll chat box to the bottom
    const scrollToBottom = () => {
        const chatBox = chatRef.current;
        if (chatBox) {
            const distance = chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight;
            const step = Math.max(1, Math.ceil(distance / 50)); // Adjust step value for smoother or faster scrolling
            let currentPosition = chatBox.scrollTop;
            const scrollDown = () => {
                currentPosition += step;
                chatBox.scrollTop = currentPosition;
                if (currentPosition < chatBox.scrollHeight - chatBox.clientHeight) {
                    requestAnimationFrame(scrollDown);
                }
            };
            requestAnimationFrame(scrollDown);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socketRef.current.emit('message', { roomId: roomId, msg: message, senderId: senderId });
            setMessage('');
        }
    };



    console.log(messageArr, "messagearr");



    // useEffect(() => {
    //     const saveMessagesToBackend = async (messages) => {


    //         console.log(message,"whats coming inside the message!!")
    //         try {
    //             await axios.post(`${server}messages/save`, { messages });
    //             console.log('Messages saved to the backend successfully');
    //         } catch (error) {
    //             console.error('Error saving messages to the backend:', error);
    //         }
    //     };

    //     socketRef.current.on('disconnect', saveMessagesToBackend);


    //     // if (socketRef.current) {
    //     //     console.log("Hey boss!!")
    //     // }

    //     // // Cleanup function to remove the event listener when the component unmounts
    //     // return () => {
    //     //     if (socketRef.current) {
    //     //         socketRef.current.off('disconnect', saveMessagesToBackend);
    //     //     }
    //     // };
    // }); 






    // useEffect(() => {
    //     const saveMessagesToBackend = async (messages) => {
    //         try {
    //             await axios.post(`${server}messages/save`, { messages });
    //             console.log('Messages saved to the backend successfully');
    //         } catch (error) {
    //             console.error('Error saving messages to the backend:', error);
    //         }
    //     };

    //     // Only send messages to the backend if there are new messages
    //     if (messageArr.length > 0) {
    //         saveMessagesToBackend(messageArr);
    //     }
    // }, [messageArr]);







    return (
        <Container>
            <Box component="section" sx={{ p: 2, border: '1px dashed grey', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'grey' }}>
                <Box style={{ display: 'flex' }}>
                    {userimage ? (
                        <img src={`${server}uploads/${userimage}`} style={{ maxWidth: '60px', maxHeight: '60px', borderRadius: '50%' }} alt="Profile" />
                    ) : (
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTI6Ah63OVTLFuA2mp9AyyutPK1fs7vyrTfLyD-LmWZseruM5afurgdxTWg&s' style={{ maxWidth: '60px', maxHeight: '60px', borderRadius: '50%' }} alt="Profile" />
                    )}
                    <Box style={{ margin: 'auto', marginLeft: '10px', color: '#fff' }}>
                        <Typography style={{ fontSize: '22px' }}>{username ? `${username}` : `Name`}</Typography>
                        <Typography>{hasValue ? 'online' : 'offline'}</Typography>
                    </Box>
                    {senderId}
                </Box>
                <Box>
                    <TrendingFlatIcon style={{ color: '#fff' }} onClick={() => navigate(-1)} />
                </Box>
            </Box>

            <Box id="chatBox" className='displays' ref={chatRef} >
                {messageArr.map((item, index) => (
                    <div key={index} className={item.id === senderId ? 'leftSideMessage TextMessage' : 'rightSideMessage TextMessage'} style={{ background: item.id === senderId ? '#0866ff' : '#e4e6eb', color: item.id === senderId ? '#fff' : '#0e0e0e', marginLeft: item.id === senderId ? 'auto' : '0' }}>
                        {item.msg}
                    </div>
                ))}
            </Box>

            <Box>
                <Box style={{ display: 'flex', alignItems: 'center' }} className='sendmessagebox' ref={sendboxRef}>
                    <TextField
                        label="Enter Message..."
                        variant="outlined"
                        fullWidth
                        margin='normal'
                        name='email'
                        type='email'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSubmit(event);
                            }
                        }}
                    />
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '33px',
                        background: 'grey',
                        padding: '8px',
                        margin: '5px',
                        color: '#fff',
                        transform: 'translateY(3px)',
                    }}>
                        <SendIcon onClick={handleSubmit} />
                    </div>
                </Box>
            </Box>
        </Container>
    );
};

export default Chat;
