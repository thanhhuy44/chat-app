import Message from "../model/message.js";
import Conversation from "../model/conversation.js";
import mongoose from "mongoose";

const handleSendMessage = async (data) => {
  const { text, sender, conversation } = data;

  if (!text || !sender || !conversation) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await Message.create({
      ...data,
      seenBy: [data.sender],
    }).then((result, error) => {
      if (result) {
        return {
          errCode: 0,
          message: "success!",
          data: result,
        };
      } else {
        return {
          errCode: 0,
          message: "error!",
          data: error,
        };
      }
    });
    return response;
  }
};

const handleSeenMessage = async (userId, conversationId) => {
  if (
    !userId ||
    !conversationId ||
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(conversationId)
  ) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await Message.updateMany(
      {
        conversation: conversationId,
      },
      {
        $addToSet: { seenBy: { $each: [userId] } },
      }
    ).then((result, error) => {
      if (result) {
        return {
          errCode: 0,
          message: "success!",
          data: result,
        };
      } else {
        return {
          errCode: 1,
          message: "error!",
          data: error,
        };
      }
    });
    return response;
  }
};

const MessageServices = {
  handleSendMessage,
  handleSeenMessage,
};

export default MessageServices;
