import { Bard } from "googlebard";
import mongoose from "mongoose";
import Conversation from "../model/conversation.js";

let cookies = `__Secure-1PSID=${process.env.BARD_COOKIES}; __Secure-1PSIDTS=${process.env.BARD_COOKIES}`;

let bot = new Bard(cookies);

const handleAskBard = async (data) => {
  const { user, question, room } = data;
  if (
    (room !== "new" && !mongoose.Types.ObjectId.isValid(room)) ||
    !mongoose.Types.ObjectId.isValid(user) ||
    !question
  ) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    return new Promise(async (resolve, reject) => {
      try {
        if (room === "new") {
          await Conversation.create({
            members: [user],
            type: "CHAT-BARD",
            updatedAt: Date.now(),
          }).then(async (result, error) => {
            if (result) {
              let conversationId = result?._id;
              let response = await bot.ask(question, conversationId);
              resolve({
                errCode: 0,
                message: "success!",
                data: response,
              });
            } else {
              resolve({
                errCode: 1,
                message: "error!",
                data: error,
              });
            }
          });
        } else {
          await Conversation.findById(room).then(async (result, error) => {
            if (result) {
              let conversationId = result?._id;
              let response = await bot.ask(question, conversationId);
              resolve({
                errCode: 0,
                message: "success!",
                data: response,
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
      } catch (error) {
        resolve({
          errCode: 1,
          message: "error!",
          data: error,
        });
      }
    });
  }
};

const chatBardServices = {
  handleAskBard,
};

export default chatBardServices;
