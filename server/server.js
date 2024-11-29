const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
};
app.use(cors(corsOptions));

app.use(express.static('client'));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('drawing', (data) => {
    socket.broadcast.emit('drawing', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
