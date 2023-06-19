import request from "../utils";

const chatApi = {
  getAllMessages: async (conversationId) => {
    const url = `/messages/${conversationId}`;
    try {
      const response = await request.get(url);
      return {
        type: "success",
        data: response,
      };
    } catch (error) {
      return {
        type: "error",
        data: error,
      };
    }
  },
};

export default chatApi;
