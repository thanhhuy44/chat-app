import chatAIServices from "../services/chatAI.js";

const chatAI = async (req, res) => {
  const data = await chatAIServices.handleSendChatAI(req.body);
  return res.status(200).json(data);
};

const chatAIControllers = {
  chatAI,
};

export default chatAIControllers;
