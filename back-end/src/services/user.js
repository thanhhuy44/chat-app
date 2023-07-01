import User from '../model/user.js';
import Conversation from '../model/conversation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const handleLogin = async (data) => {
  const { userName, password } = data;

  if (!userName || !password) {
    return {
      errCode: 1,
      message: 'form error!',
    };
  } else {
    const response = await User.findOne({
      userName: userName,
    }).then(async (result, error) => {
      if (error) {
        return {
          errCode: 1,
          message: 'error',
          data: error,
        };
      } else {
        if (result) {
          const same = await bcrypt.compare(password, result.password);
          if (same) {
            let token = jwt.sign({ result }, process.env.TOKEN_SECRET, {
              expiresIn: '1h',
            });
            return {
              errCode: 0,
              message: 'success!',
              data: result,
              token,
            };
          } else {
            return {
              errCode: 1,
              message: 'wrong password!',
            };
          }
        } else {
          return {
            errCode: 1,
            message: 'user not found!',
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
      message: 'form error!',
    };
  } else {
    const response = await User.findOne({
      userName: userName,
    }).then(async (result, error) => {
      if (error) {
        return {
          errCode: 1,
          message: 'error',
          data: error,
        };
      } else {
        if (result) {
          return {
            errCode: 1,
            message: 'user already exist!',
          };
        } else {
          const newUser = await User.create(data).then((result, error) => {
            if (result) {
              return {
                errCode: 0,
                message: 'success!',
                data: result,
              };
            } else {
              return {
                errCode: 1,
                message: 'error!',
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
        type: 'success',
        data: result,
      };
    } else {
      return {
        type: 'error',
        data: error,
      };
    }
  });
  return data;
};

const handleGetAll = async (page = 1, pageSize = 50, userId) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return {
      errCode: 1,
      message: 'form error!',
    };
  } else {
    const response = await User.find({
      _id: { $ne: userId },
    })
      .skip((page - 1) * 10)
      .limit(pageSize)
      .then((result, error) => {
        if (result) {
          return {
            errCode: 0,
            message: 'success!',
            data: result,
          };
        } else {
          return {
            errCode: 1,
            message: 'error',
            data: error,
          };
        }
      });
    return response;
  }
};

const handleGetUser = async (userId, guestId) => {
  if (
    !userId ||
    !mongoose.Types.ObjectId.isValid(userId) ||
    !guestId ||
    !mongoose.Types.ObjectId.isValid(guestId)
  ) {
    return {
      errCode: 1,
      message: 'form error!',
    };
  } else {
    const response = await User.findById({
      _id: guestId,
    }).then(async (result, error) => {
      if (error) {
        return {
          errCode: 1,
          message: 'error!',
          data: error,
        };
      } else {
        if (result) {
          const conversation = await Conversation.findOne({
            members: { $all: [userId, guestId] },
          }).then((conversation, error) => {
            if (error) {
              return {
                errCode: 1,
                message: 'error!',
                data: error,
              };
            } else {
              if (conversation) {
                return {
                  errCode: 0,
                  message: 'success!',
                  data: {
                    user: result,
                    conversation: conversation,
                  },
                };
              } else {
                return {
                  errCode: 0,
                  message: 'success!',
                  data: {
                    user: result,
                    conversation: null,
                  },
                };
              }
            }
          });

          return conversation;
        } else {
          return {
            errCode: 1,
            message: 'user not found!',
            data: null,
          };
        }
      }
    });
    return response;
  }
};

const UserServices = {
  handleChangeUserStatus,
  handleLogin,
  handleReagister,
  handleGetAll,
  handleGetUser,
};

export default UserServices;
