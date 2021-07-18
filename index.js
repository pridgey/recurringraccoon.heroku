const options = {
  cors: {
    methods: ["GET", "POST"],
    allowedHeaders: ["raccoon"],
    origin: JSON.parse(process.env.ALLOWABLE_ORIGINS),
  },
};
const io = require("socket.io")(process.env.PORT || 80, options);

io.socketsJoin("lobby");

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.console.log("Message:", message);

    io.in("lobby")
      .fetchSockets()
      .then((sockets) => sockets.forEach((socket) => socket.send(message)));

    // socket.send(message);
  });
});
