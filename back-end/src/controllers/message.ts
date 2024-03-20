import { Request, Response } from "express";
import MessageServices from "../services/message";
import { IBodySendMessage, IResponse } from "../types/interface";
import { EMessage } from "../types/enum";
import { checkId } from "../utils";

const send = async (req: Request, res: Response) => {
  const sender = req?.user;
  const body: IBodySendMessage = req.body;
  if (sender && body.room && body.type) {
    const data = await MessageServices.handleSendMessage(sender, req.body);
    return res.status(data.statusCode).json(data);
  } else {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request!",
      data: null,
    } as IResponse);
  }
};

const getAll = async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 50;
  if (!checkId(roomId)) {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request!",
      data: null,
    } as IResponse);
  }
  const data = await MessageServices.handleGetMessages(roomId, page, pageSize);
  return res.status(data.statusCode).json(data);
};

const MessageControllers = {
  send,
  getAll,
};

export default MessageControllers;
