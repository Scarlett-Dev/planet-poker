const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const sessionRoute = require('./backend/routes/sessions');


var corsOptions = {
  origin: 'http://localhost/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors());
app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH,PUT, DELETE, OPTIONS");
  next();
});

app.use('/api/sessions', sessionRoute)

app.get('/', cors(corsOptions), (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION , { dbName: 'planet-poker' , useNewUrlParser: true},()=> {
  console.log('Connected to DB planet-poker');
})