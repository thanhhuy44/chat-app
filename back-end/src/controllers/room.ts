import { Request, Response } from "express";
import RoomServices from "../services/room";
import { TypeRoom } from "../types/enum";
import { IResponse } from "../types/interface";
import { checkId } from "../utils";

const get = async (req: Request, res: Response) => {
  const userId = req.user;
  const guestId = req.body.guestId;
  const type = req.body.type as TypeRoom;
  if (!guestId || !type || !userId) {
    res.status(400).json({
      statusCode: 400,
      message: "Bad Request!",
      data: null,
    } as IResponse);
  }
  if (!checkId(userId) || !checkId(guestId)) {
    res.status(400).json({
      statusCode: 400,
      message: "Bad Request: Invalid ID!",
      data: null,
    } as IResponse);
  }
  const data = await RoomServices.handleGetRoom(
    userId as string,
    guestId,
    type
  );
  return res.status(data.statusCode).json(data);
};

const getAll = async (req: Request, res: Response) => {
  const page = parseInt(req.query?.page as string) || 1;
  const pageSize = parseInt(req.query?.pageSize as string) || 50;
  const user = req.user;
  const data = await RoomServices.handleGetAll(user, page, pageSize);
  return res.status(data.statusCode).json(data);
};

const getInfo = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!checkId(id)) {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad request: Invalid room id!",
      data: null,
    } as IResponse);
  }
  const data = await RoomServices.handleGetInfo(id);
  if (data) {
    return res.status(200).json({
      statusCode: 200,
      message: "OK!",
      data,
    } as IResponse);
  } else {
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error!",
      data,
    } as IResponse);
  }
};

const RoomControllers = {
  get,
  getAll,
  getInfo,
};

export default RoomControllers;
