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



  socket.on('message', async ({ roomId, msg, senderId, count }) => {
    console.log(`User sent message: ${msg}`);

    count ++

    console.log(count, "countcountcount",    count
    )

    // Add message to the room's message array
    messagesByRoom[roomId].push({ id: senderId, msg });

    console.log(`Messages in room ${roomId}:`, messagesByRoom[roomId], senderId, count);

    // Emit the message back to all clients in the same room
    io.to(roomId).emit('message', { sender: senderId, msg, roomId, count });
    io.to(roomId).emit('messageList', { roomId: roomId, messages: messagesByRoom[roomId], count });

    try {
      // Send the message to the backend server
      await axios.post('http://localhost:5000/messages/save', { roomId, msg, senderId });
      console.log('Message saved to the backend successfully');
    } catch (error) {
      console.error('Error saving message to the backend:', error);
    }
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

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
