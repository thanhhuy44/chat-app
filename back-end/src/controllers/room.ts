import { Request, Response } from 'express';
import RoomServices from '../services/room';

const get = async (req: Request, res: Response) => {
  const data = await RoomServices.handleGetRoom(req.body);
  return res.status(data.statusCode).json(data);
};

const RoomControllers = {
  get,
};

export default RoomControllers;
