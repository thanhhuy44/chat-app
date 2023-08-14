import dotenv from "dotenv";
import mongoose from "mongoose";
import { Configuration, OpenAIApi } from "openai";
import Conversation from "../model/conversation.js";
import Message from "../model/message.js";
import ConversationServices from "./conversation.js";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handleSendChatGPT = async (data) => {
  const { user, message, room } = data;
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !mongoose.Types.ObjectId.isValid(user) ||
        !message ||
        (room !== "new" && !mongoose.Types.ObjectId.isValid(room))
      ) {
        resolve({
          errCode: 0,
          message: "form error!",
        });
      } else {
        const answer = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        });
        if (room === "new") {
          const newConversation =
            await ConversationServices.handleCreateConversation({
              members: [user],
            });
          if (newConversation.errCode === 0) {
            const message = await handleSendMessage({
              sender: user,
              conversation: newConversation.data._id,
              text: text,
              answer: answer,
            });
            resolve({
              errCode: 0,
              message: "success!",
              data: message?.data,
            });
          } else {
            return {
              errCode: 1,
              message: "error!",
            };
          }
        } else {
          await Message.create({
            sender: user,
            answer: answer,
            conversation: room,
            text: message,
          }).then((result, error) => {
            if (result) {
              resolve({
                errCode: 0,
                message: "success!",
                data: result,
              });
            } else {
              resolve({
                errCode: 1,
                message: "error!",
                data: error,
              });
            }
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error !",
        error: error.message,
      });
    }
  });
};

const chatAIServices = {
  handleSendChatGPT,
};

export default chatAIServices;
