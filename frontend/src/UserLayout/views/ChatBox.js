import React, { useEffect, useState, useRef } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { server } from '../../server';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { setMessageArr } from '../../redux/features/chatFeature';
import { useSelector } from 'react-redux';

const ENDPOINT = 'http://localhost:4000/';

const ChatBox = ({ data }) => {

  const socket = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, groupTitle, userimage, senderId, reciverId } = data;

  const [lastmessage, setLastmessage] = useState(null);
  const [count, setCount] = useState(0);



  useEffect(() => {
    socket.current = io(ENDPOINT);

    socket.current.on('connect', () => {
      socket.current.emit('joinRoom', { roomId: groupTitle });

    });


    socket.current.on('message', (data) => {
      if (data) {
        const { count } = data;
        setCount(count)
      }
      setLastmessage(data);
    });
    // socket.current.emit('removecount', { senderId, groupTitle ,reciverId});


    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [groupTitle]);



  useEffect(() => {

    socket.current.on('tempData', (tempData) => {
      const findvalue= `${reciverId}.${groupTitle}`

      console.log(tempData, "vss", groupTitle);

      console.log(tempData.hasOwnProperty[groupTitle], "prorps")


      if (tempData.hasOwnProperty(findvalue)) {

        setCount(tempData[findvalue])
      }
    });

    // Emit 'testing' event when component mounts
    socket.current.emit('testing');
  }, [])







  const BoxHandler = () => {

    
    socket.current.emit('removecount', { senderId, groupTitle ,reciverId});

    // alert('clicked!!')
    navigate(`/converstion?${groupTitle}`, {
      state: { username, groupTitle, userimage, senderId, reciverId }
    });

  };

  return (
    <Box onClick={BoxHandler}>

      
      <Grid container spacing={0} style={{ background: '#fafa', justifyContent: 'space-between', padding: '10px', color: '#fff', marginBottom: '1px' }}>
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
            <Typography>{lastmessage?.roomId === groupTitle ? `${lastmessage.msg} ` : data.lastMessage}</Typography>

            {/* {count} */}
          </div>
        </Grid>
        <Grid>
          <Typography>
            {/* {lastmessage?.roomId === groupTitle && count > 0 && (
              <div className='messageCount'>{count}</div>
            )} */}

            {
              count > 0 && <div className='messageCount'>{count}</div>


            }
          </Typography>
          9.10am
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatBox;
