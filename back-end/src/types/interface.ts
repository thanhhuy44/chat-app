import { EMessage, TypeRoom } from "./enum";

export interface IResponse {
  statusCode: number;
  message: string;
  data: any;
  token?: string;
  pagination?: {
    page?: number;
    pageSize?: number;
    totalPage?: number;
  };
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginSocialForm {
  email: string;
  avatar: string;
  fullName: string;
}

export interface IUser {
  fullName: string;
  email: string;
  phoneNumber?: string;
  birthday?: string;
  password: string;
  isOnline?: boolean;
}

export interface IBodyGetRoom {
  members: string[];
  type: TypeRoom;
}

export interface IBodySendMessage {
  sender: string;
  type: EMessage;
  room: string;
  text?: string;
  images?: string[];
  files?: string[];
  repliedMessage?: string;
}
