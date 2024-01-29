import Message from '../models/message';
import { IBodySendMessage, IResponse } from '../types/interface';

const handleSendMessage = async (
  body: IBodySendMessage
): Promise<IResponse> => {
  const message = await Message.create({
    ...body,
    seenBy: [body.sender],
    createdAt: Date.now(),
  });
  if (message) {
    return {
      statusCode: 201,
      message: 'OK!',
      data: message,
    };
  } else {
    return {
      statusCode: 500,
      message: 'Internal Server Error!',
      data: null,
    };
  }
};

const MessageServices = {
  handleSendMessage,
};

export default MessageServices;
