import request from "../utils";

const conversationApi = {
  getall: async () => {
    const url = `/conversations`;
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

  getDetailByMember: async (guestId) => {
    const url = `/conversations/detail/by-guest?guestId=${guestId}`;
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
