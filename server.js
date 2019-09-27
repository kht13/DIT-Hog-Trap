// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
var server = require('http').Server(app);
const io=require('socket.io')(server);

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('trust proxy', true); 

io.on('connection',function(socket){
  console.log("Connect");
  
  socket.on('TestEvent',function(data){
    console.log(data.description)
    io.emit('TestEvent',data);
  });
  
  socket.on('setTrapOff',function(data){
    io.emit('activateTrap',data);
    console.log(socket);
  });
  
  socket.on('trapActivated',function(data){
    console.log(data);
  });
  
})
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
