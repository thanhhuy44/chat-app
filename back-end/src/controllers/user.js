import User from "../model/user.js";
import jwt from "jsonwebtoken";
import UserServices from "../services/user.js";

const register = async (req, res) => {
  const data = await UserServices.handleReagister(req.body);
  return res.status(200).json(data);
};

const login = async (req, res) => {
  const data = await UserServices.handleLogin(req.body);
  return res.status(200).json(data);
};

const getAll = async (req, res) => {
  const token = req.headers["authorization"];
  const info = jwt.decode(token);

  const data = await UserServices.handleGetAll(
    req.query.page || 1,
    req.query.pageSize || 50,
    info.result._id
  );
  return res.status(200).json(data);
};

const findUserByName = async (req, res) => {
  const data = new Promise(async (resolve, reject) => {
    try {
      await User.find({
        lastName: new RegExp("^" + req.query.keyword + "$", "i"),
      }).then((users, error) => {
        if (users) {
          resolve({
            errCode: 0,
            message: "Successfully!",
            data: users,
          });
        } else {
          resolve({
            errCode: 1,
            message: "Error!",
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
  return data.then((data) => res.json(data));
};

const UserControllers = {
  register,
  login,
  getAll,
};

export default UserControllers;
