import { Request, Response } from "express";
import RoomServices from "../services/room";

const get = async (req: Request, res: Response) => {
  const data = await RoomServices.handleGetRoom(req.body);
  return res.status(data.statusCode).json(data);
};

const getAll = async (req: Request, res: Response) => {
  const page = parseInt(req.query?.page as string) || 1;
  const pageSize = parseInt(req.query?.pageSize as string) || 50;
  const user = req.user;
  const data = await RoomServices.handleGetAll(user, page, pageSize);
  return res.status(data.statusCode).json(data);
};

const RoomControllers = {
  get,
  getAll,
};

export default RoomControllers;
