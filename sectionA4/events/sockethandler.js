const Conversation = require("../models/conversation");

exports.handleChat = (socket) => {
  socket.on("send-message", async (payload) => {
    console.log("Message received");
    const roomId = await Conversation.getRoom(
      payload.senderId,
      payload.receiverId
    );
    payload.roomId = roomId[0].room_id;
    console.log("roomId:", roomId);
    console.log("Payload:", payload);
    Conversation.saveMessage(payload, (err, result) => {
      if (err) {
        socket.emit("error", { message: "Error saving message", err });
      } else {
        console.log("Result of saving message", result);
        socket.to(payload.roomId).emit("receive-message", payload);
        socket.emit("receive-message", payload);
      }
    });
  });

  socket.on("join-room", async (payload) => {
    const room = await Conversation.getRoom(
      payload.senderId,
      payload.receiverId
    );
    console.log(room);
    if (room.length > 0) {
      socket.join(room[0].room_id);
      console.log(`User ${socket.id} joined room ${room[0].room_id}`);
    } else {
      socket.emit("error", { message: "Room does not exist" });
    }
  });

  // Leaving a room
  socket.on("leave-room", (room) => {
    socket.leave(room);
    console.log(`User ${socket.id} left room ${room}`);
  });
};
