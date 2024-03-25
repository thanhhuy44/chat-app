import { Server, Socket } from "socket.io";
import Message from "../models/message";
import Conversation from "../models/room";
import UserServices from "../services/user";
import RoomServices from "../services/room";
import MessageServices from "../services/message";

const connectedUsers: string[] = [];

const socket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.on("online", async (userId) => {
      connectedUsers.push(userId);
      const updatedUser = await UserServices.handleChangeUserStatus(
        userId,
        true
      );
      socket.broadcast.emit("updated-status", updatedUser);
    });

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
    });

    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);
    });

    socket.on("send-message", async (data) => {
      const message = await MessageServices.handleSendMessage(data.sender, {
        ...data,
      });

      io.in(data.room).emit("received-message", message.data);
    });

    socket.on("offline", async (id) => {
      const updatedUser = await UserServices.handleChangeUserStatus(id, false);
      socket.broadcast.emit("updated-status", updatedUser);
    });

    socket.on("disconnect", async (reason, description) => {
      console.log("🚀 ~ socket.on ~ reason:", reason);
      console.log("🚀 ~ socket.on ~ description:", description);
    });
  });
};

export default socket;
