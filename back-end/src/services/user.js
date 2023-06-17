import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleLogin = async ({ userName, password }) => {
  const data = await User.findOne({
    userName,
  }).then(async (user, error) => {
    if (error) {
      return {
        errCode: 1,
        message: "error",
        error,
      };
    } else {
      if (user) {
        const same = bcrypt.compare(password, user.password);
        if (same) {
          let token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
          });
          return {
            errCode: 0,
            message: "success",
            user,
            token,
          };
        } else {
          return {
            errCode: 1,
            message: "wrong password!",
          };
        }
      } else {
        return {
          errCode: 1,
          message: "user not found",
        };
      }
    }
  });
  return data;
};

const handleOnline = async (id) => {
  const data = await User.findByIdAndUpdate(id, {
    isOnline: true,
  }).then((result, error) => {
    if (result) {
      return {
        type: "success",
        data: result,
      };
    } else {
      return {
        type: "error",
        data: error,
      };
    }
  });
  return data;
};

const handleOffline = () => {};

const UserServices = {
  handleOnline,
  handleLogin,
};

export default UserServices;
