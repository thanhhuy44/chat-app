import chatAIServices from "../services/chatAI.js";

const chatAI = async (req, res) => {
  const data = await chatAIServices.handleSendChatAI(null);
  return res.json(data);
};

const chatAIControllers = {
  chatAI,
};

export default chatAIControllers;
