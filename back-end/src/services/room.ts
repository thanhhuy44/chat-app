import Room from "../models/room";
import { IBodyGetRoom, IResponse } from "../types/interface";

const handleGetRoom = async (body: IBodyGetRoom): Promise<IResponse> => {
  const room = await Room.findOne(body);
  if (room) {
    return {
      statusCode: 200,
      message: "OK!",
      data: room,
    };
  } else {
    const newRoom = await Room.create({
      ...body,
      createdAt: Date.now(),
    });
    if (newRoom) {
      return {
        statusCode: 201,
        message: "OK!",
        data: newRoom,
      };
    } else {
      return {
        statusCode: 500,
        message: "Internal Server Error",
        data: null,
      };
    }
  }
};

const RoomServices = {
  handleGetRoom,
};

export default RoomServices;
