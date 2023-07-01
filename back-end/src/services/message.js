import Message from '../model/message.js';
import Conversation from '../model/conversation.js';
import mongoose from 'mongoose';
import ConversationServices from './conversation.js';

const handleSendMessage = async (data) => {
  const { text, sender, conversation } = data;

  if (!text || !sender || !conversation) {
    return {
      errCode: 1,
      message: 'form error!',
    };
  } else {
    const response = await Message.create({
      ...data,
      seenBy: [data.sender],
    }).then((result, error) => {
      if (result) {
        return {
          errCode: 0,
          message: 'success!',
          data: result,
        };
      } else {
        return {
          errCode: 0,
          message: 'error!',
          data: error,
        };
      }
    });
    return response;
  }
};

const handleSendMessageNew = async (data) => {
  const { sender, receiver, text } = data;
  if (
    !text ||
    !mongoose.Types.ObjectId.isValid(sender) ||
    !mongoose.Types.ObjectId.isValid(receiver)
  ) {
    console.log('error here');
    return {
      errCode: 1,
      message: 'form error!',
    };
  } else {
    const response = await Conversation.findOne({
      members: { $all: [sender, receiver] },
    }).then(async (result, error) => {
      if (error) {
        return {
          errCode: 1,
          message: 'error!',
          data: error,
        };
      } else {
        if (result) {
          const message = await handleSendMessage({
            sender: sender,
            conversation: result._id,
            text: text,
          });
          return message;
        } else {
          const newConversation =
            await ConversationServices.handleCreateConversation({
              members: [sender, receiver],
            });
          if (newConversation.errCode === 0) {
            const message = await handleSendMessage({
              sender: sender,
              conversation: newConversation.data._id,
              text: text,
            });
            return message;
          } else {
            return {
              errCode: 1,
              message: 'error!',
            };
          }
        }
      }
    });
    return response;
  }
};

const handleSeenMessage = async (userId, conversationId) => {
  if (
    !userId ||
    !conversationId ||
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(conversationId)
  ) {
    return {
      errCode: 1,
      message: 'form error!',
    };
  } else {
    const response = await Message.updateMany(
      {
        conversation: conversationId,
      },
      {
        $addToSet: { seenBy: { $each: [userId] } },
      }
    ).then((result, error) => {
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
    return response;
  }
};

const MessageServices = {
  handleSendMessage,
  handleSeenMessage,
  handleSendMessageNew,
};

export default MessageServices;
