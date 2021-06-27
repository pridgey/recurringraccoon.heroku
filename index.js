const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  allowRequest: (req, callback) => {
    // Get the allowable origins
    const allowableOrigins = JSON.parse(process.env.ALLOWABLE_ORIGINS);
    const isOriginValid = allowableOrigins.includes(req.origin);
    callback(null, isOriginValid);
  },
});

var port = process.env.PORT || 80;

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log("Message:", message);
  });
});

httpServer.listen(port, () => {
  console.log(`${new Date()} | Server is listening on port: ${port}`);
});

//===================================================================================

// var WebSocketServer = require("websocket").server;
// var http = require("http");

// var server = http.createServer({}, function (request, response) {
//   // This does stuff
// });

// var port = process.env.PORT || 80;

// // Start listening
// server.listen(port, function () {
//   console.log(`${new Date()} | Server is listening on port: ${port}`);
// });

// // Create websocket server
// var wsServer = new WebSocketServer({
//   httpServer: server,
// });

// // Do WebSocket stuff
// wsServer.on("request", function (request) {
//   console.log(" ");
//   console.log("=========================");
//   console.log(`${new Date()} | New Request`);
//   console.log("Request Origin:", request.origin);

//   // Get the allowable origins
//   const allowableOrigins = JSON.parse(process.env.ALLOWABLE_ORIGINS);
//   // Check if this origin is in our allowable origins
//   if (allowableOrigins.includes(request.origin)) {
//     console.log("Request Accepted :)");
//     // Request is accepted
//     var connection = request.accept(null, request.origin);

//     // What to do when we receive a message
//     connection.on("message", function (message) {
//       connection.send(message.data);
//     });

//     connection.on("close", function (connection) {
//       // close user connection
//     });
//   } else {
//     console.log("Rejected");
//     request.reject(403, "Origin not allowed");
//   }
// });
