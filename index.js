var WebSocketServer = require("websocket").server;
var http = require("http");

var server = http.createServer(function (request, response) {
  // This does stuff
});

var port = process.env.PORT || 80;

// Start listening
server.listen(port, function () {
  console.log(`${new Date()} | Server is listening on port: ${port}`);
});

// Create websocket server
var wsServer = new WebSocketServer({
  httpServer: server,
});

// Do WebSocket stuff
wsServer.on("request", function (request) {
  console.log("Origin:", request.origin);

  console.log("Allowable:", process.env.ALLOWABLE_ORIGINS);
  console.log("Test:", Array.isArray(process.env.ALLOWABLE_ORIGINS));
  console.log("Type:", typeof process.env.ALLOWABLE_ORIGINS);
  console.log("JSON:", JSON.parse(process.env.ALLOWABLE_ORIGINS));

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
