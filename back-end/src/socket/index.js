import { Server } from "socket.io";

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected.");

    socket.on("disconnect", () => {
      console.log("A client disconnected.");
    });
  });
};

export default socket;
