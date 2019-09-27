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

  var isTrap=false;
  console.log("Connect");
  
  socket.on('activateTrap',function(data){
    io.emit('activateTrap',data);
    console.log(socket);
  });
  
  socket.on('online',function(data){
    if(data.name=="hogTrap")
      {
        isTrap=true;
      }
    io.emit('online',data);
  });
  
  socket.on('disconnect',function(){
    if(isTrap)
      {
        
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

// listen for requests :)
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
