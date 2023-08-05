import { Server } from "socket.io";
import Message from "../model/message.js";
import Conversation from "../model/conversation.js";
import UserServices from "../services/user.js";
import ConversationServices from "../services/conversation.js";
import MessageServices from "../services/message.js";

const connectedUsers = {};

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    let userConnectedId = null;
    socket.on("online", async (userId) => {
      userConnectedId = userId;
      connectedUsers[userConnectedId] = userId;
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

    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("send-message", async (data) => {
      const message = await MessageServices.handleSendMessage(data);
      if (message) {
        await ConversationServices.handleUpdateConversation(message.data);
      }
      io.to(data.conversation).emit("received_message", message);
      io.to(data.conversation).emit("updated-conversations");
    });

    socket.on("send-message-new", async (data) => {
      const message = await MessageServices.handleSendMessageNew(data);
      if (message) {
        socket.emit("update-message-new", message);
        io.emit("updated-conversations");
      }
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
      io.emit("updated-conversations");
      io.emit("updated-users");
    });

    socket.on("disconnect", async () => {
      console.log("A client disconnected.");
      if (userConnectedId) {
        const user = connectedUsers[userConnectedId];
        if (user) {
          await UserServices.handleChangeUserStatus(user, false);
          delete connectedUsers[userConnectedId];
        }
      }
    });
  });
};

export default socket;
