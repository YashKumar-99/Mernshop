import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Typography, TextField } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { server } from '../../server';
import './index.css';
import { useNavigate } from 'react-router-dom';

const ENDPOINT = 'http://localhost:4000/';

const Chat = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messageArr, setMessageArr] = useState([]);

    const [user, setOnlineUsers] = useState(null);
    const location = useLocation();
    const { search } = location;
    const { state } = location;

    const chatRef = useRef();
    const { username, groupTitle, userimage, senderId } = state || {};
    const roomId = search.slice(1);
    const socketRef = useRef(null);

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

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);



    useEffect(() => {
        socketRef.current.emit("new-user-add", senderId);

    })

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
                        <Typography style={{ fontSize: '22px' }}>{username ? `${username}` : `Engineer`}</Typography>
                        <Typography>Active</Typography>
                    </Box>
                    {senderId}
                </Box>
                <Box>
                    <TrendingFlatIcon style={{ color: '#fff' }} onClick={() => navigate(-1)} />
                </Box>
            </Box>

            <Box id="chatBox" className='displays' ref={chatRef}>
                {messageArr.map((item, index) => (
                    <div key={index} className={item.id === senderId ? 'leftSideMessage TextMessage' : 'rightSideMessage TextMessage'} style={{ background: item.id === senderId ? '#0866ff' : '#e4e6eb', color: item.id === senderId ? '#fff' : '#0e0e0e', marginLeft: item.id === senderId ? 'auto' : '0' }}>
                        {item.msg}
                    </div>
                ))}
            </Box>

            <Box>
                <Box style={{ display: 'flex', alignItems: 'center' }} className='sendmessagebox'>
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
