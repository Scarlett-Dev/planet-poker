const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors());

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH,PUT, DELETE, OPTIONS");
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
  
});

// app.get('/io', (req, res) => {
//   res.sendFile(__dirname + '/src/index.html');
  
// });

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});