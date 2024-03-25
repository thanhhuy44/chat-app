import { EMessage } from "./enum";

export type ApiResponse = {
  statusCode: number;
  message: string;
  data: any;
  token?: string;
};

export type User = {
  _id: string;
  fullName: string;
  avatar: string;
  isOnline: boolean;
};

export type Room = {
  _id: string;
  members: Array<User>;
  lastMessage?: Message;
  updatedAt: string;
  createdAt: string;
};

export type Message = {
  _id: string;
  sender: User | string;
  seenBy: string[];
  text?: string;
  type: EMessage;
};
