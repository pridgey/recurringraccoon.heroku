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
  console.log(" ");
  console.log("=========================");
  console.log(`${new Date()} | New Request`);
  console.log("Request Origin:", request.origin);

  const allowableOrigins = JSON.parse(process.env.ALLOWABLE_ORIGINS);
  if (allowableOrigins.includes(request.origin)) {
    console.log("Request Accepted :)");
    // Request is accepted
    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on("message", function (message) {
      if (message.type === "utf8") {
        // process WebSocket message
        console.log("Message:", message);
        connection.sendUTF(message);
      }
    });

    connection.on("close", function (connection) {
      // close user connection
    });
  } else {
    console.log("Rejected");
    request.reject(403, "Origin not allowed");
  }
});
