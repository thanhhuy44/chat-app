import mongoose from "mongoose";
import Room from "../models/room";
import { IBodyGetRoom, IResponse } from "../types/interface";
import { TypeRoom } from "../types/enum";

const handleGetRoom = async (
  userId: string,
  guestId: string,
  type: TypeRoom
): Promise<IResponse> => {
  const room = await Room.findOne({
    members: [userId, guestId],
    type,
  });
  if (room) {
    return {
      statusCode: 200,
      message: "OK!",
      data: room,
    };
  } else {
    const newRoom = await Room.create({
      members: [userId, guestId],
      type: TypeRoom.Single,
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

const handleGetAll = async (
  userId?: string,
  page = 1,
  pageSize = 50
): Promise<IResponse> => {
  if (!userId) {
    return {
      statusCode: 400,
      message: "Bad Request: Missing User ID!",
      data: null,
    };
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return {
      statusCode: 400,
      message: "Bad Request: Invalid User ID!",
      data: null,
    };
  }
  const rooms = await Room.find({
    members: userId,
    lastMessage: { $ne: null },
  })
    .populate("lastMessage")
    .populate("members")
    .sort("-updatedAt")
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  const total = await Room.countDocuments();
  return {
    statusCode: 200,
    message: "OK!",
    data: rooms,
    pagination: {
      page,
      pageSize,
      totalPage: Math.ceil(total / pageSize),
    },
  };
};

const handleGetInfo = async (id: string) => {
  const info = await Room.findById(id, {
    lastMessage: 0,
  }).populate("members");
  return info;
};

const RoomServices = {
  handleGetRoom,
  handleGetAll,
  handleGetInfo,
};

export default RoomServices;
