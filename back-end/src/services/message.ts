import Message from "../models/message";
import { IBodySendMessage, IResponse } from "../types/interface";

const handleSendMessage = async (
  sender: string,
  body: IBodySendMessage
): Promise<IResponse> => {
  const message = await Message.create({
    ...body,
    sender: sender,
    seenBy: [sender],
    createdAt: Date.now(),
  });
  if (message) {
    return {
      statusCode: 201,
      message: "OK!",
      data: message,
    };
  } else {
    return {
      statusCode: 500,
      message: "Internal Server Error!",
      data: null,
    };
  }
};

const handleGetMessages = async (
  room: string,
  page = 1,
  pageSize = 500
): Promise<IResponse> => {
  const messages = await Message.find({
    room,
  })
    .populate("sender")
    .sort("-createdAt")
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  const total = await Message.find({
    room,
  }).countDocuments();
  if (messages) {
    return {
      statusCode: 200,
      message: "OK!",
      data: messages,
      pagination: {
        page,
        pageSize,
        totalPage: Math.ceil(total / pageSize),
      },
    };
  } else {
    return {
      statusCode: 500,
      message: "Internal Server Error!",
      data: null,
    };
  }
};

const MessageServices = {
  handleSendMessage,
  handleGetMessages,
};

export default MessageServices;
