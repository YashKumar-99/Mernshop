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
import { format, render, cancel, register } from 'timeago.js';
import CircularProgress from '@mui/material/CircularProgress';

import { setMessageArr, feaMessageArr, lastMessage, fetchMessagesStart, fetchMessagesSuccess, fetchMessagesFailure } from '../../redux/features/chatFeature';

import { useSelector, useDispatch } from 'react-redux';

import AddIcon from '@mui/icons-material/Add';

const ENDPOINT = 'http://localhost:4000/';

const Chat = () => {



    const dispatch = useDispatch();

    const { messageArr, loading } = useSelector((store) => store?.chat);


    console.log(messageArr, "messageArrmessageArrmessageArrmessageArr")

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messageImage, setMessageImage] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);

    // const [messageArr, setMessageArr] = useState([]);

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





    const handleFileSelect = () => {
        const fileInput = document.createElement('input');

        console.log(fileInput, "fileinnnnn")
        fileInput.type = 'file';
        fileInput.onchange = (e) => setSelectedFile(e.target.files[0]);
        fileInput.click();
    };

    console.log(selectedFile, "dddd")

    // const handleFileChange = (file) => {

    //     console.log(file,"onchnage  ")
    //     setSelectedFile(file);
    //     // Handle the selected file
    // };










    useEffect(() => {

        async function getMessagesfrombackend() {


            try {
                // dispatch(fetchMessagesStart()); // Dispatch action to indicate the start of fetching messages

                const AllMessages = await axios.post('/messages/getAllMessages', {
                    groupTitle
                });

                dispatch(setMessageArr(AllMessages?.data?.getMessages))

                console.log(AllMessages, "allmessagesishere..!!")


            } catch (error) {

                console.log(error, "getting error here!!")

            }

        }
        getMessagesfrombackend();



    }, [])


    console.log(selectedFile, "selectedFileselectedFile")

    useEffect(() => {
        socketRef.current = io(ENDPOINT);

        socketRef.current.on('connect', () => {
            socketRef.current.emit('joinRoom', { roomId: roomId });
        });

        socketRef.current.on('message', (msg) => {
            // setMessageArr(prevMessages => [...prevMessages, msg]);
            console.log(msg, "messagewillappet here!!")

            msg.converstionId = roomId;

            dispatch(feaMessageArr(msg)); // Assuming msg is a single message object
            // dispatch(lastMessage(msg));

            // dispatch(setMessageArr(msg))
            scrollToBottom();


            if (msg) {
                const storedCount = sessionStorage?.getItem(`chatCount_${groupTitle}`);
                storedCount++


                sessionStorage.setItem(`chatCount_${groupTitle}`, storedCount.toString());


            }
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



    // console.log(hasValue, "itemteimtemtie");


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


        if (message && message !== '') {


            socketRef.current.emit('message', { roomId: roomId, msg: message, senderId: senderId });

        } else if (selectedFile && message === '') {

            socketRef.current.emit('message', { roomId: roomId, msg: '', senderId: senderId });

        } else if (message && selectedFile) {
            socketRef.current.emit('message', { roomId: roomId, msg: message, senderId: senderId, file: selectedFile });


        }


        // if (message.trim() || selectedFile) {

        //     if (selectedFile) {

        //         socketRef.current.emit('message', { roomId: roomId, msg: message, senderId: senderId, file: selectedFile });

        //     } else {
        //         socketRef.current.emit('message', { roomId: roomId, msg: message, senderId: senderId });

        //     }



        //     // dispatch(lastMessage({ roomId: roomId, msg: message, senderId: senderId }))
        //     setMessage('');
        // }
    };

    console.log(messageArr, "messageArrmessageArr");



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
                    {/* {senderId} */}
                </Box>
                <Box>
                    <TrendingFlatIcon style={{ color: '#fff' }} onClick={() => navigate(-1)} />
                </Box>
            </Box>

            <Box id="chatBox" className='displays' ref={chatRef} >
                {messageArr?.map((item, index) => (
                    <div key={index} className={item.sender === senderId ? 'rightSideMessage TextMessage' : 'leftSideMessage TextMessage'} style={{ background: item.sender === senderId ? '#0866ff' : '#e4e6eb', color: item.sender === senderId ? '#fff' : '#0e0e0e', marginLeft: item.sender === senderId ? 'auto' : '0' }}>
                        {item.msg}

                    </div>
                ))}
            </Box>

            <Box>
                <Box style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }} className='sendmessagebox' ref={sendboxRef}>
                    {/* <Box style={{ width: '40px' }}><AddIcon /></Box>
                    <input type="file"

                    /> */}
                    

                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            border: '1px solid #ccc',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            marginRight: '10px',
                        }}
                        onClick={handleFileSelect}

                    >
                        <AddIcon />
                    </button>

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
