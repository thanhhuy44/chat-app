import request from "../utils";

const conversationApi = {
  getall: async (userId) => {
    const url = `/conversations/${userId}`;
    try {
      const response = await request.get(url);
      return {
        type: "success",
        data: response,
      };
    } catch (error) {
      console.log(error);
      return {
        type: "error",
        data: error,
      };
    }
  },
  getDetail: async (conversationId) => {
    const url = `/conversations/detail/${conversationId}`;
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

export default conversationApi;
