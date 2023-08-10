import dotenv from "dotenv";
import mongoose from "mongoose";
import { Configuration, OpenAIApi } from "openai";
import Conversation from "../model/conversation.js";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handleSendChatAI = async (data) => {
  const { user, message, room } = data;
  return new Promise(async (resolve, reject) => {
    try {
      if (!data || !user || !message || !room) {
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
          await Conversation.create({
            members: [user],
            messages: [
              { role: "user", message },
              answer.data.choices[0].message,
            ],
            type: "BOT",
          });
        } else {
          // await Conversation.findByIdAndUpdate(
          //   { _id: room },
          //   {
          //     members: [user],
          //     messages: [
          //       { role: "user", message },
          //       answer.data.choices[0].message,
          //     ],
          //     type: "BOT",
          //   }
          // );
        }

        resolve({
          errCode: 0,
          message: "success !",
          data: answer.data,
        });
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
  handleSendChatAI,
};

export default chatAIServices;
