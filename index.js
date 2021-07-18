const options = {
  cors: {
    methods: ["GET", "POST"],
    allowedHeaders: ["raccoon"],
    origin: JSON.parse(process.env.ALLOWABLE_ORIGINS),
  },
};
const io = require("socket.io")(process.env.PORT || 80, options);

const sockets = [];

io.on("connection", (socket) => {
  sockets.push(socket);

  socket.on("message", (message) => {
    sockets.forEach((socket) => socket.send(message));
    //socket.send(message);
  });
});
