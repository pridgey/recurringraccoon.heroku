const options = {
  cors: {
    methods: ["GET", "POST"],
    allowedHeaders: ["raccoon"],
    origin: JSON.parse(process.env.ALLOWABLE_ORIGINS),
  },
};
const io = require("socket.io")(process.env.PORT || 80, options);

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log("");
    console.log("");
    console.log("Message:", message);
    console.log("");
    socket.send(message);
  });
});
