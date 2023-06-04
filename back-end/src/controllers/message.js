import Conversation from "../model/conversation.js";
import Message from "../model/message.js";
import mongoose from "mongoose";

const createMessage = async (req, res) => {
  const body = req.body;
  const data = new Promise(async (resolve, reject) => {
    try {
      await Message.create({
        conversation: body.conversation,
        sender: body.sender,
        text: body.text,
        seenBy: [body.sender],
      }).then(async (message, error) => {
        if (error) {
          resolve({
            errCode: 1,
            error,
          });
        } else {
          const conversation = await Conversation.findById({
            _id: body.conversation,
          });
          await Conversation.findByIdAndUpdate(
            {
              _id: body.conversation,
            },
            {
              lastMessage: message._id,
              messages: [...conversation.messages, message._id],
            }
          ).then((conversation, error) => {
            if (error) {
              resolve({
                errCode: 1,
                error,
              });
            } else {
              resolve({
                errCode: 0,
                message: "Successfully!",
                data: message,
              });
            }
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });

  return data.then((data) => res.json(data));
};

const seenMessage = async (req, res) => {
  const body = req.body;
  const data = new Promise(async (resolve, reject) => {
    try {
      await Message.updateMany(
        {
          conversation: body.conversation,
        },
        {
          $addToSet: { seenBy: { $each: [body.user] } },
        }
      ).then((messages, error) => {
        if (error) {
          resolve({
            errCode: 1,
            error,
          });
        } else {
          resolve({
            errCode: 0,
            message: "Successfully!",
            data: messages,
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });

  return data.then((data) => res.json(data));
};

const MessagesControllers = {
  createMessage,
  seenMessage,
};

export default MessagesControllers;
