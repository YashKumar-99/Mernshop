import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { server } from '../../server';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { useRef } from 'react';
import { setMessageArr } from '../../redux/features/chatFeature';

const ENDPOINT = 'http://localhost:4000/';

const ChatBox = ({ data }) => {
  const socket = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, groupTitle, userimage, senderId, reciverId } = data;


  const [lastmessage, setLastmessage] = useState(null);
  var [count, setCount] = useState(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    socket.current = io(ENDPOINT);

    // Join room when connected
    socket.current.on('connect', () => {
      socket.current.emit('joinRoom', { roomId: groupTitle });
    });

    // Listen for 'message' event from the server
    socket.current.on('message', (data) => {
      console.log('messagesdatafromsocketmessagesdatafromsocketmessagesdatafromsocket', data);
      // Dispatch action to update Redux store with new message;



      // dispatch(setMessageArr(data));

      if (data) {
        setCount(prevCount => prevCount + 1);
      }
      setLastmessage(data);


    });

    // Clean up Socket.IO connection on component unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [dispatch, groupTitle]); // Add 'groupTitle' to dependency array

  const BoxHandler = () => {
    navigate(`/converstion?${groupTitle}`, {
      state: { username, groupTitle, userimage, senderId, reciverId }
    });
  };

  return (
    <Box onClick={BoxHandler}>
      <Grid container spacing={0} style={{ background: '#535332', justifyContent: 'space-between', padding: '10px', color: '#fff', marginBottom: '1px' }}>
        <Grid item style={{ display: 'flex', padding: '0px' }}>
          <div className='profile-sec'>
            {userimage ? (
              <img src={`${server}uploads/${userimage}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="Profile" />
            ) : (
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTI6Ah63OVTLFuA2mp9AyyutPK1fs7vyrTfLyD-LmWZseruM5afurgdxTWg&s' style={{ maxWidth: '60px', maxHeight: '60px', borderRadius: '50%' }} alt="Profile" />
            )}
          </div>
          <div style={{ paddingLeft: '10px' }}>
            <Typography><b>{username}</b></Typography>
            {/* Display last message */}




            <Typography>{lastmessage?.roomId === groupTitle ? lastmessage.msg : data.lastMessage}</Typography>
          </div>
        </Grid>
        <Grid>

          <Typography>
            {lastmessage?.roomId === groupTitle && count > 0 && (
              <div className='messageCount'>{count}</div>
            )}
          </Typography>

          9.10am</Grid>
      </Grid>
    </Box>
  );
};

export default ChatBox;
