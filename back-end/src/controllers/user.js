import bcrypt from "bcrypt";
import User from "../model/user.js";
import UserToken from "../model/token.js";
import jwt from "jsonwebtoken";
import UserServices from "../services/user.js";

const userSignUp = async (req, res) => {
  const data = new Promise(async (resolve, reject) => {
    try {
      await User.find({ userName: req.body.userName }).then(
        async (result, error) => {
          if (result.length > 0) {
            resolve({
              errCode: 1,
              message: "Exist user!",
              data: error,
            });
          } else {
            await User.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              userName: req.body.userName,
              phoneNumber: req.body.phoneNumber,
              email: req.body.email,
              password: req.body.password,
            }).then((result, error) => {
              if (result) {
                resolve({
                  errCode: 0,
                  message: "Sign up successfully!",
                  data: result,
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "Error!",
                  data: error,
                });
              }
            });
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });

  return data.then((data) => {
    res.json(data);
  });
};

const userLogin = async (req, res) => {
  const data = await UserServices.handleLogin({
    userName: req.body.userName,
    password: req.body.password,
  });
  return res.status(200).json(data);
};

const userLogout = async (req, res) => {
  const data = new Promise((resolve, reject) => {
    try {
      UserToken.findOneAndRemove({
        token: req.headers["x-access-token"],
      }).then((user, error) => {
        if (error) {
          resolve({
            errCode: 1,
            message: error.message,
          });
        } else {
          if (user) {
            resolve({
              errCode: 0,
              message: "Log out successfully!",
            });
          } else {
            resolve({
              errCode: 1,
              message: "Error!",
            });
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });
  return data.then((data) => res.json(data));
};

const getAllUsers = async (req, res) => {
  const data = new Promise(async (resolve, reject) => {
    try {
      await User.find({}).then((users, error) => {
        if (error) {
          resolve({
            errCode: 1,
            message: error.message,
          });
        } else {
          if (users) {
            resolve({
              errCode: 0,
              message: "Successfully!",
              data: users,
            });
          } else {
            resolve({
              errCode: 0,
              message: "Can not find users!",
            });
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });

  data.then((data) => res.json(data));
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

const renewToken = async (req, res) => {
  const data = new Promise(async (resolve, reject) => {
    try {
      await UserToken.findOne({
        refreshToken: req.headers["refreshToken"],
      }).then((data, error) => {
        if (error) {
          resolve({ errCode: 1, message: error });
        } else {
          if (data) {
            let newToken = jwt.sign(
              { userName: data.userName },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "1800s",
              }
            );
            let newRefreshToken = jwt.sign(
              { userName: data.userName },
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: "30d",
              }
            );
            UserToken.findOneAndReplace(
              {
                user: data.user,
              },
              { token: newToken, refreshToken: newRefreshToken }
            );
            resolve({
              errCode: 0,
              message: "Successfully!",
              newToken: newToken,
              newRefreshToken: newRefreshToken,
            });
          } else {
            resolve({ errCode: 1, message: "Not found refreshToken" });
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });

  return data.then((data) => res.json(data));
};

const UserControllers = {
  signUp: userSignUp,
  logIn: userLogin,
  logOut: userLogout,
  getAll: getAllUsers,
  searchUsers: findUserByName,
  getNewToken: renewToken,
};

export default UserControllers;
