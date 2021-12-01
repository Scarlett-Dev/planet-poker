

const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



const userAddedEvent = 'new_user_added';
// const sessionAddedEvent = 'new_session_added';
const singleUserAddedEvent = 'single_new_user_added';


sessionsMap = new Map();

var userArray = [];
var sessionArray = [];

var corsOptions = {
  origin: 'http://salturnus.nl/',
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

// Listen to new sessions that are beeing created
io.on('connection', (socket) => {
  console.log('New session created');
  socket.on('new_session_created', function(messageText){
    console.log("In socket.on "+ messageText);
    newSessionCreated(messageText, socket)
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
function newSessionCreated(data, socket){
  sessionArray.push(data);
  console.log("Sessions array"+ sessionArray.entries())



  //TODO Shady stuff, we dont need this actually? :)
  console.log("Joined users: " + data.joinedUsers)

  // PINGU DID THIS!!! adding sessionID and user connected to this session (CHECK IF THIS WORKS)
  for(let key of data.joinedUsers){
    console.log("For loop: "+ key.name);
    console.log("For loop: "+ key.selectedScore);
    sessionsMap.set(data.sessionID, key.name.toString())
  }


  console.log("Logging sessionsMap size : "+ sessionsMap.size)
  console.log("Registered new session", sessionArray);
  console.log("Data content: ", data);


  console.log(sessionsMap.entries());
}


function newUserTestForSingleEntry(data, socket){
    //   userArray.push(data);
  socket.emit(singleUserAddedEvent, data);
  // socket.emit(userAddedEvent, userArray);
  console.log("Emitting new event: SINGLE user was added.", data);
}


server.listen(8080, () => {
  console.log('listening on *:8080');
});
