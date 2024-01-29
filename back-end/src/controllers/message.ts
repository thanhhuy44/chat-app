import { Request, Response } from 'express';
import MessageServices from '../services/message';
import { IBodySendMessage, IResponse } from '../types/interface';
import { EMessage } from '../types/enum';

const send = async (req: Request, res: Response) => {
  const body: IBodySendMessage = req.body;
  if (
    body.room &&
    body.sender.length &&
    Object.values(EMessage).includes(body.type)
  ) {
    const data = await MessageServices.handleSendMessage(req.body);
    return res.status(data.statusCode).json(data);
  } else {
    return res.status(400).json({
      statusCode: 400,
      message: 'Bad Request!',
      data: null,
    } as IResponse);
  }
};

const MessageControllers = {
  send,
};

export default MessageControllers;
