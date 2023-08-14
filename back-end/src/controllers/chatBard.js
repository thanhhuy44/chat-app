import chatBardServices from "../services/chatBard.js";

const askBard = async (req, res) => {
  const data = await chatBardServices.handleAskBard(req.body);
  return res.status(200).json(data);
};

const chatBardControllers = {
  askBard,
};

export default chatBardControllers;
