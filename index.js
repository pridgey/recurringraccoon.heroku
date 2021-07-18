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
  console.log("========");
  console.log("socket:", io.in("lobby"));
  console.log("========");

  socket.on("message", (message) => {
    socket.console.log("Message:", message);
    socket.send(message);
  });
});
