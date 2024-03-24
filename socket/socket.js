const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const axios = require('axios')

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  }
});

// Store messages by room ID
const messagesByRoom = {};

const users = {};

const tempobj = {

}


io.on("connection", (socket) => {
  // console.log(`a user is connected !!`);

  socket.on('joinRoom', ({ roomId }) => {
    console.log(`User joined room: ${roomId}`);
    socket.join(roomId);

    // Initialize message array for the room if not exists
    if (!messagesByRoom[roomId]) {
      messagesByRoom[roomId] = [];
    }

    // Emit all messages in the room to the client
    socket.emit('messageList', { roomId: roomId, messages: messagesByRoom[roomId] });
  });


  socket.on('login', function (data) {
    console.log('a user ' + data.userId + ' connected');
    // saving userId to object with socket ID
    users[socket.id] = data.userId;

    io.emit("activeuser", users);
    console.log(users, "userishere..!!")



  });



  // socket.on('message', async ({ roomId, msg, senderId, count }) => {


  //   console.log(`User sent message: ${msg}`);

  //   const newvalue = count + 1;

  //   const newId = `${senderId}.${roomId}`
  //   tempobj[newId] = newvalue;

  //   const returncount = tempobj[newId]

  //   console.log(count, "countcountcount", count)

  //   // Add message to the room's message array
  //   messagesByRoom[roomId].push({ id: senderId, msg });

  //   console.log(`Messages in room ${roomId}:`, messagesByRoom[roomId], senderId, returncount);

  //   // Emit the message back to all clients in the same room
  //   io.to(roomId).emit('message', { sender: senderId, msg, roomId, count: returncount });


  //   io.to(roomId).emit('messageList', { roomId: roomId, messages: messagesByRoom[roomId] });


  //   console.log(tempobj, "tempobjjjj")

  //   try {
  //     // Send the message to the backend server
  //     await axios.post('http://localhost:5000/messages/save', { roomId, msg, senderId });
  //     console.log('Message saved to the backend successfully');
  //   } catch (error) {
  //     console.error('Error saving message to the backend:', error);
  //   }

  //   console.log(tempobj, "hellotemp")

  // });





  socket.on('message', async ({ roomId, msg, senderId }) => {
    // Check if the count is stored in tempobj, if not, initialize it to 0
    const newId = `${senderId}.${roomId}`;
    if (!tempobj[newId]) {
      tempobj[newId] = 0;
    }
  
    // Increment the count
    tempobj[newId]++;
  
    // Retrieve the updated count from tempobj
    const returncount = tempobj[newId];
  
    // Add message to the room's message array
    messagesByRoom[roomId].push({ id: senderId, msg });
  
    console.log(`Messages in room ${roomId}:`, messagesByRoom[roomId], senderId, returncount);
  
    // Emit the message back to all clients in the same room
    io.to(roomId).emit('message', { sender: senderId, msg, roomId, count: returncount });
  
    io.to(roomId).emit('messageList', { roomId: roomId, messages: messagesByRoom[roomId] });
  
    try {
      // Send the message to the backend server
      await axios.post('http://localhost:5000/messages/save', { roomId, msg, senderId });
      console.log('Message saved to the backend successfully');
    } catch (error) {
      console.error('Error saving message to the backend:', error);
    }
  
    console.log(tempobj, "hellotemp");
  });
  






  socket.on('testing', () => {
    console.log('Testing event received');
    // Send data stored in tempobj back to the client
    socket.emit('tempData', tempobj);
    // io.to(roomId).emit('tempData', tempobj);

  });



  socket.on('removecount', ({ senderId, groupTitle, reciverId }) => {

    const newvalue = `${reciverId}.${groupTitle}`
    console.log(newvalue, "newvaluefromcount")
    if (tempobj.hasOwnProperty(newvalue)) {

      console.log("helos")
      tempobj[newvalue] = 0

      const returncount = tempobj[newvalue]

      // let roomId=groupTitle;

      // io.to(roomId).emit('message', { sender: senderId,  roomId, count: returncount });


    }

    console.log(tempobj, 'Testing event received');


  });




  socket.on('disconnect', () => {
    console.log(`a user is disconnected !!`);


    console.log('user ' + users[socket.id] + ' disconnected');
    // remove saved socket from users object
    delete users[socket.id];
    io.emit("activeuser", users)
    console.log(users, "userishere..!!")

  });
});
console.log('hello')
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
