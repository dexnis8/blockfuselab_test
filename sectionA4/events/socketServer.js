const { Server } = require("socket.io");
const { handleChat } = require("./sockethandler");

const io = new Server({
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

const chatNamespace = io.of("/chat");

chatNamespace.on("connection", (socket) => {
  console.log(`User connected with session ID: ${socket.id}`);

  handleChat(socket);

  socket.on("disconnect", () => {
    console.log(`User disconnected with session ID: ${socket.id}`);
  });
});

module.exports = io;
