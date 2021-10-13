const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



const userAddedEvent = 'new_user_added';
const singleUserAddedEvent = 'single_new_user_added';


messagesMap = new Map();

var userArray = [];

var corsOptions = {
  origin: 'http://localhost/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors());
console.log('CORS USED: ', cors());
// app.use((req,res,next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH,PUT, DELETE, OPTIONS");
//   next();
// });

app.get('/', cors(corsOptions), (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

// app.get('/io', (req, res) => {
//   res.sendFile(__dirname + '/src/index.html');
  
// });

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('new_user_created', function(messageText){
    console.log("In socket.on "+messageText);
    newUserCreated(messageText, socket);
    newUserTestForSingleEntry(messageText, socket);
  });

  });

  /**
   * 
   * @param {*} data 
   * @param {*} socket 
   */
function newUserCreated(data, socket){
  userArray.push(JSON.parse(data));
  //   userArray.push(data); 
  socket.emit(userAddedEvent, JSON.stringify(userArray));
  // socket.emit(userAddedEvent, userArray);
  console.log("Emitting new event that the user was added.", userArray);
}


function newUserTestForSingleEntry(data, socket){
    //   userArray.push(data); 
  socket.emit(singleUserAddedEvent, data);
  // socket.emit(userAddedEvent, userArray);
  console.log("Emitting new event: SINGLE user was added.", data);
}


server.listen(3000, () => {
  console.log('listening on *:3000');
});