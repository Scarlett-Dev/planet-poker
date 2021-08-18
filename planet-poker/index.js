const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const userAddedEvent = 'new_user_added';

messagesMap = new Map();

var userArray = [];

var emitRdy = false;

var jsonCollection = {
  "user": [
    {
      "username": "StandardOne",
      "points": "1"
    },
    {
      "username": "StandardTwo",
      "points": "2"
    }
  ]
};


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
    newUserCreated(messageText, socket)
  });

  // socket.on('potato', function(messageText) {
  //   console.log('The Collection of the passed stuff:', messageText)
  //   console.log('The username: ', messageText.user);
  //   console.log('The selected points: ', messageText.points);

  //   messagesMap.set(messageText.user, messageText.points);

  //   console.log('Sending the following values to Angular: ', jsonCollection);
    if(!emitRdy){
      socket.emit(userAddedEvent, userArray);
      console.log("AGAIN: Emitting new event that the user was added.");
    }

  //   console.log('Emitted the event "mashed potato" with the following values: ', jsonCollection)

  });

  /**
   * 
   * @param {*} data 
   * @param {*} socket 
   */
function newUserCreated(data, socket){
  userArray.push(data);
  console.log("Added the new user to the array ", userArray);

  

  socket.emit(userAddedEvent, userArray.toLocaleString);
  console.log("Emitting new event that the user was added.", userArray.toLocaleString);

  emitRdy = true;
}



server.listen(3000, () => {
  console.log('listening on *:3000');
});