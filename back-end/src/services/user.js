import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleLogin = async (data) => {
  const { userName, password } = data;

  if (!userName || !password) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await User.findOne({
      userName: userName,
    }).then(async (result, error) => {
      if (error) {
        return {
          errCode: 1,
          message: "error",
          data: error,
        };
      } else {
        if (result) {
          const same = await bcrypt.compare(password, result.password);
          if (same) {
            let token = jwt.sign({ result }, process.env.TOKEN_SECRET, {
              expiresIn: "1h",
            });
            return {
              errCode: 0,
              message: "success!",
              data: result,
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
            message: "user not found!",
          };
        }
      }
    });
    return response;
  }
};

const handleReagister = async (data) => {
  const { firstName, lastName, email, phoneNumber, password, userName } = data;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !userName ||
    !password
  ) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await User.findOne({
      userName: userName,
    }).then(async (result, error) => {
      if (error) {
        return {
          errCode: 1,
          message: "error",
          data: error,
        };
      } else {
        if (result) {
          return {
            errCode: 1,
            message: "user already exist!",
          };
        } else {
          const newUser = await User.create(data).then((result, error) => {
            if (result) {
              return {
                errCode: 0,
                message: "success!",
                data: result,
              };
            } else {
              return {
                errCode: 1,
                message: "error!",
                data: error,
              };
            }
          });
          return newUser;
        }
      }
    });
    return response;
  }
};

const handleChangeUserStatus = async (id, status) => {
  const data = await User.findByIdAndUpdate(id, {
    isOnline: status,
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

const UserServices = {
  handleChangeUserStatus,
  handleLogin,
  handleReagister,
};

export default UserServices;
