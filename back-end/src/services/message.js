import Message from "../model/message.js";
import Conversation from "../model/conversation.js";

const handleSendMessage = async (form) => {
  const { conversation, sender, text } = form;
  const message = await Message.create({
    conversation: conversation,
    sender: sender,
    text: text,
    seenBy: [sender],
  }).then(async (message, error) => {
    if (message) {
      await Conversation.findByIdAndUpdate(
        {
          _id: conversation,
        },
        {
          lastMessage: message._id,
          $push: {
            messages: { $each: [message._id] },
          },
        }
      );
      return {
        errCode: 0,
        message: "success",
        data: message,
      };
    } else {
      return {
        errCode: 1,
        message: "error",
        data: error,
      };
    }
  });
  return message;
};

const handleSeenMessage = async () => {};

const MessageServices = {
  handleSendMessage,
  handleSeenMessage,
};

export default MessageServices;
