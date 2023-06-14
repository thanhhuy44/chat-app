import request from "../utils";

const userApi = {
  login: async (userName, password) => {
    try {
      const response = await request.post("/users/login", {
        userName,
        password,
      });
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

  register: async (
    firstName,
    lastName,
    userName,
    email,
    phoneNumber,
    password
  ) => {
    try {
      const response = await request.post("/users/register", {
        firstName,
        lastName,
        userName,
        email,
        phoneNumber,
        password,
      });
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

  changePassword: () => {},

  forgotPassword: () => {},
};

export default userApi;
