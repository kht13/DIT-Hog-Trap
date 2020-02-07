// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
var server = require('http').Server(app);
const io=require('socket.io')(server);
const fs = require('fs');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('trust proxy', true); 

var trapIsOnline=false;

io.on('connection',function(socket){
  var isTrap=false;
  io.emit('trapIsOnline',trapIsOnline);
  console.log("Connect");
  
  socket.on('image',function(data){
    io.emit('image',data);
  });
  
  socket.on('identify',function(data){
    if(data.name=="hogTrap")
      {
        trapIsOnline=isTrap=true;
      }
    io.emit('trapIsOnline',trapIsOnline);
  });
  
  socket.on('activateTrap',function(data){
    io.emit('activateTrap',data);
  })
  
  socket.on('updatePic', function(data) {
    io.emit('updatePic', data);
  })
  
  socket.on('disconnect',function(){
    if(isTrap)
      {
        trapIsOnline=false;
        io.emit('trapIsOnline',trapIsOnline);
        console.log("Trap is offline.")
      }
  });
  
  socket.on('trapActivated',function(data){
    io.emit('trapActivated',data);
  });
  
})
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/ping',function(request, response){
  response.send("Why you pinged me");
  console.log("I got pinged.");
});

// listen for requests :)
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
