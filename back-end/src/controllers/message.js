import Conversation from "../model/conversation.js";
import Message from "../model/message.js";
import mongoose from "mongoose";
import MessageServices from "../services/message.js";

const send = async (req, res) => {
  const data = await MessageServices.handleSendMessage(req.body);
  return res.status(200).json(data);
};

const seen = async (req, res) => {
  const data = await MessageServices.handleSeenMessage(
    req.body.userId,
    req.body.conversationId
  );
  return res.status(200).json(data);
};

const getAllMessages = async (req, res) => {
  const conversationId = req.params.conversationId;
  await Message.find({
    conversation: conversationId,
  }).then((result, error) => {
    if (result) {
      return res.status(200).json({
        errCode: 0,
        message: "Successfully!",
        data: result,
      });
    } else {
      return res.status(400).json({
        errCode: 1,
        message: "Error!",
        data: error,
      });
    }
  });
};

const MessagesControllers = {
  send,
  seen,
  getAllMessages,
};

export default MessagesControllers;
