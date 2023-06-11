import { Server } from "socket.io";
import Message from "../model/message.js";
import Conversation from "../model/conversation.js";

const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected.");

    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("send-message", async (data) => {
      await Message.create({
        conversation: data.conversation,
        sender: data.sender,
        text: data.text,
        seenBy: [data.sender],
      }).then(async (message, error) => {
        if (error) {
          resolve({
            errCode: 1,
            error,
          });
        } else {
          await Conversation.findByIdAndUpdate(
            {
              _id: data.conversation,
            },
            {
              lastMessage: message._id,
              $push: {
                messages: { $each: [message._id] },
              },
            }
          ).populate("messages");
        }
      });
      const messages = await Message.find({
        conversation: data.conversation,
      });

      const conversation = await Conversation.find({
        members: data.sender,
      })
        .populate({
          path: "lastMessage",
        })
        .populate({
          path: "members",
        });

      io.to(data.conversation).emit("received_message", messages);
      io.emit("updated-conversations", conversation);
    });

    socket.on("disconnect", () => {
      console.log("A client disconnected.");
    });
  });
};

export default socket;
