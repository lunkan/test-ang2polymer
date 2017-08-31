const WebSocketServer = require('websocket').server;

class Socket {

  constructor() {}

  init(server) {
    const self = this;

    console.log('Init socket');
    var wsServer = new WebSocketServer({
      httpServer: server
    });

    wsServer.on('request', function(request) {  
      self.connection = request.accept(null, request.origin);
      console.log('Connection initilized');

      self.connection.on('close', function(connection) {
        console.log('Connection closed');
        // close user connection
      });
    });


  }

  emit(changeEvent) {
    if(this.connection) {
      console.log('emit changeEvent', changeEvent);
      this.connection.sendUTF(JSON.stringify(changeEvent));
    } else {
      console.log('emit changeEvent FAILED - no connection', changeEvent);
    }
  }
}

const socket = new Socket();
module.exports = socket;