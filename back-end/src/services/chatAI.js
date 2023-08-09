import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handleSendChatAI = async () => {
  //   const { user, message, room } = data;
  return new Promise(async (resolve, reject) => {
    try {
      const answer = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello world" }],
      });
      resolve({
        errCode: 1,
        message: "success !",
        data: answer,
      });
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
