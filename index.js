var WebSocketServer = require("websocket").server;
var http = require("http");

var server = http.createServer(function (request, response) {
  // This does stuff
});

// Start listening
server.listen(1337, function () {});

// Create websocket server
var wsServer = new WebSocketServer({
  httpServer: server,
});

// Do WebSocket stuff
wsServer.on("request", function (request) {
  console.log("Origin:", request.origin);

  // Call this if accepted
  var connection = request.accept(null, request.origin);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on("message", function (message) {
    if (message.type === "utf8") {
      // process WebSocket message
      connection.sendUTF(message);
    }
  });

  connection.on("close", function (connection) {
    // close user connection
  });
});
