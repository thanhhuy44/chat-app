import Conversation from "../model/conversation.js";

const handleGetConversationsOfUser = async (userId) => {
  const data = await Conversation.find({
    members: userId,
  }).then((result, error) => {
    if (result) {
      return {
        errCode: 0,
        message: "Success",
        data: result,
      };
    } else {
      return {
        errCode: 1,
        message: "error",
        data: error,
      };
    }
  });
  return data;
};

const ConversationServices = {
  handleGetConversationsOfUser,
};

export default ConversationServices;
