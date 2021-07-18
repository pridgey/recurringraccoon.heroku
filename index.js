const options = {
  cors: {
    methods: ["GET", "POST"],
    allowedHeaders: ["raccoon"],
    origin: JSON.parse(process.env.ALLOWABLE_ORIGINS),
  },
};
const io = require("socket.io")(process.env.PORT || 80, options);

io.on("connection", (socket) => {
  console.log("========");
  console.log("socket:", socket);
  console.log("========");

  socket.on("message", (message) => {
    console.log("Message:", message);
    socket.send(message);
  });
});
