import mongoose from "mongoose";
import Conversation from "../model/conversation.js";

const handleCreateConversation = async (data) => {
  if (!data.members) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await Conversation.findOne({
      members: data.members,
    }).then(async (result, error) => {
      if (error) {
        return {
          errCode: 1,
          message: "error!",
          data: error,
        };
      } else {
        if (result) {
          return {
            errCode: 1,
            message: "conversation already exist!",
          };
        } else {
          const newConversation = await Conversation.create(data).then(
            (result, error) => {
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
            }
          );
          return newConversation;
        }
      }
    });
    return response;
  }
};

const handleGetHistoryChat = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: "error form!",
    };
  } else {
    const response = await Conversation.find({
      members: id,
    })
      .sort({ updatedAt: -1 })
      .select("-messages")
      .populate("lastMessage")
      .then((result, error) => {
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
    return response;
  }
};

const handleGetDetailConversationByMembers = async (members) => {
  if (!members) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await Conversation.findOne({
      members: members,
    }).then(async (result, error) => {
      if (error) {
        return {
          errCode: 1,
          message: "error!",
          data: error,
        };
      } else {
        if (result) {
          return {
            errCode: 0,
            message: "success!",
            data: result,
          };
        } else {
          const newConversation = await Conversation.create({
            members: members,
          }).then(async (result, error) => {
            if (result) {
              const newResult = await Conversation.findOne({
                members: members,
              })
                .populate("members")
                .then((result, error) => {
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
              return newResult;
            } else {
              return {
                errCode: 1,
                message: "error!",
                data: error,
              };
            }
          });
          return newConversation;
        }
      }
    });
    return response;
  }
};

const handleGetDetailConversationById = async (id) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return {
      errCode: 1,
      message: "form error1",
    };
  } else {
    const response = await Conversation.findById({
      _id: id,
    })
      .populate("members")
      .then((result, error) => {
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
    return response;
  }
};

const handleUpdateConversation = async (message) => {
  const data = Conversation.findByIdAndUpdate(
    { _id: message.conversation },
    {
      lastMessage: message._id,
      updatedAt: Date.now(),
    }
  ).then((result, error) => {
    if (result) {
      return {
        errCode: 0,
        message: "success",
        data: result,
      };
    } else {
      return {
        errCode: 1,
        message: "error",
        data: error,
      };
    }
  });
  return data;
};

const handleCheckExistConversation = async (members) => {
  const data = await Conversation.findOne({
    members: members,
  })
    .select("-messages")
    .then((result, error) => {
      if (error) {
        return {
          errCode: 1,
          message: "error",
          data: error,
        };
      } else {
        if (result) {
          return {
            errCode: 0,
            message: "success",
            data: true,
            conversation: result,
          };
        } else {
          return {
            errCode: 1,
            message: "not found",
            data: false,
          };
        }
      }
    });
  return data;
};

const ConversationServices = {
  handleCreateConversation,
  handleGetHistoryChat,
  handleUpdateConversation,
  handleCheckExistConversation,
  handleGetDetailConversationByMembers,
  handleGetDetailConversationById,
};

export default ConversationServices;
