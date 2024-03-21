import { Server, Socket } from "socket.io";
import Message from "../models/message";
import Conversation from "../models/room";
import UserServices from "../services/user";
import RoomServices from "../services/room";
import MessageServices from "../services/message";

const connectedUsers: any = {};

const socket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    let userConnectedId: string | null = null;
    socket.on("online", async (userId) => {
      console.log("🚀 ~ socket.on ~ userId:", userId);
      userConnectedId = userId;
      await UserServices.handleChangeUserStatus(userId, true);
      socket.emit("updated-conversations");
    });

    socket.on("join-rooms", (rooms) => {
      if (rooms) {
        for (let index = 0; index < rooms.length; index++) {
          const room = rooms[index];
          socket.join(room?._id);
        }
      }
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

      //   const message = "";
      io.in(data.room).emit("received-message", message.data);
    });

    socket.on("logout", async (id) => {
      console.log("A client logout.");
      if (userConnectedId) {
        const user = connectedUsers[userConnectedId];
        if (user) {
          await UserServices.handleChangeUserStatus(user, false);
          delete connectedUsers[userConnectedId];
        }
      }
      io.emit("updated-users");
    });

    socket.on("disconnect", async () => {
      console.log("A client disconnected.");
      if (userConnectedId) {
        const user = connectedUsers[userConnectedId];
        if (user) {
          console.log("🚀 ~ file: index.js:75 ~ socket.on ~ user:", user);
          await UserServices.handleChangeUserStatus(user, false);
          delete connectedUsers[userConnectedId];
        }
      }
    });
  });
};

export default socket;
