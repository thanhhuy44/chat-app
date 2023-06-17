import Conversation from "../model/conversation.js";

const createConversation = async (req, res) => {
  const data = new Promise(async (resolve, reject) => {
    try {
      await Conversation.create({
        members: req.rawBody.members,
      }).then((result, error) => {
        if (error) {
          resolve({
            errCode: 1,
            error,
          });
        } else {
          resolve({
            errCode: 0,
            message: "Create successfully!",
            data: result,
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });

  return data.then((data) => res.json(data));
};

const getConversationsOfUser = async (req, res) => {
  const data = new Promise(async (resolve, reject) => {
    try {
      await Conversation.find({
        members: req.params.user,
      })
        .select("-messages")
        .populate({
          path: "lastMessage",
        })
        .populate({
          path: "members",
        })
        .then((result, error) => {
          if (error) {
            resolve({
              errCode: 1,
              error,
            });
          } else {
            resolve({
              errCode: 0,
              message: "Successfully!",
              data: result,
            });
          }
        });
    } catch (error) {
      reject(error);
    }
  });
  return data.then((data) => res.json(data));
};

const getDetailConversation = async (req, res) => {
  const data = new Promise(async (resolve, reject) => {
    try {
      await Conversation.findById({
        _id: req.params.id,
      })
        .select("-messages ")
        .populate({
          path: "members",
        })
        .then((result, error) => {
          if (error) {
            resolve({
              errCode: 1,
              error,
            });
          } else {
            resolve({
              errCode: 0,
              message: "Successfully!",
              data: result,
            });
          }
        });
    } catch (error) {
      reject(error);
    }
  });

  return data.then((data) => res.json(data));
};

const ConversationControllers = {
  createConversation,
  getConversationsOfUser,
  getDetailConversation,
};

export default ConversationControllers;
