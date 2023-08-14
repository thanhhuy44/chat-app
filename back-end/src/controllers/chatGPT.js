import chatAIServices from "../services/chatGPT.js";

const chatAI = async (req, res) => {
  const data = await chatAIServices.handleSendChatGPT(req.body);
  return res.status(200).json(data);
};

const chatAIControllers = {
  chatAI,
};

export default chatAIControllers;
