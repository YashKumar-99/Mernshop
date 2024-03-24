  import React, { useEffect } from 'react';
  import { Grid, Typography, Box } from '@mui/material';
  import { server } from '../../server';
  import { useNavigate } from 'react-router-dom';
  import { useSelector, useDispatch } from 'react-redux';
  import axios from 'axios';
  import { setMessageArr } from '../../redux/features/chatFeature';
  import io from 'socket.io-client';
  import { useRef } from 'react';

  import { feaMessageArr } from '../../redux/features/chatFeature';
  const ENDPOINT = 'http://localhost:4000/';

  const ChatBox = ({ data }) => {

    const socket = useRef(null);

    console.log(data,"dddddaaatttaa")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socketRef = useRef();
    const { username, groupTitle, userimage, senderId, reciverId ,lastMessage } = data;

    const AllMessage = useSelector((store) => store?.chat?.messageArr);

    console.log(AllMessage,"allmessages")








    useEffect(() => {
      // Initialize Socket.IO connection
      socket.current = io(`${ENDPOINT}`);

      socketRef.current.on('connect', () => {
          socketRef.current.emit('joinRoom', { roomId: groupTitle });
      });

      // Listen for 'message' event from the server
      socket.current.on('message', (data) => {
          console.log('messagesdatafromsocket', data);
          // Dispatch action to update Redux store with new message
          dispatch(setMessageArr(data));
      });

      // Clean up Socket.IO connection on component unmount
      return () => {
          if (socket.current) {
              socket.current.disconnect();
          }
      };
  }, []);


    // const lastMessage = AllMessage[AllMessage.length - 1];


    // if (lastMessage) {
    //   var { msg, sender ,conversationId } = lastMessage
    // }



    // console.log(lastMessage, "messagedata")

    // useEffect(() => {
    //   async function getMessagesfrombackend() {
    //     try {
    //       const AllMessages = await axios.post('/messages/getAllMessages', {
    //         groupTitle
    //       });

    //       console.log(AllMessages, "alm")
    //       await dispatch(setMessageArr(AllMessages?.data?.getMessages));
    //     } catch (error) {
    //       console.log(error, "getting error here!!");
    //     }
    //   }
    //   getMessagesfrombackend();

    //   // // Socket connection setup
    //   // socketRef.current = io(ENDPOINT);
    //   // socketRef.current.on('connect', () => {
    //   //   socketRef.current.emit('joinRoom', { roomId: groupTitle });
    //   // });

    //   // // Handle incoming messages
    //   // socketRef.current.on('message', (msg) => {
    //   //   dispatch(feaMessageArr(msg)); // Dispatch action to update Redux state with the new message
    //   // });

    //   // return () => {
    //   //   socketRef.current.disconnect();
    //   // };
    // }, []);

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
              <Typography>{lastMessage}</Typography>


            
            </div>
          </Grid>
          <Grid>9.10am</Grid>
        </Grid>
      </Box>
    );
  };

  export default ChatBox;

