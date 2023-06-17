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
    socket.on("online", async (userId) => {
      await UserServices.handleOnline(userId);
    });

    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("send-message", async (data) => {
      const message = await MessageServices.handleSendMessage(data);
      io.to(data.conversation).emit("received_message", message);
      // io.emit("updated-conversations", conversation);
      io.in();
    });

    socket.on("disconnect", () => {
      console.log("A client disconnected.");
    });
  });
};

export default socket;
