import { Request, Response } from "express";
import User from "../models/user";
import {
  ILoginForm,
  ILoginSocialForm,
  IResponse,
  IUser,
} from "../types/interface";
import UserServices from "../services/user";
import mongoose from "mongoose";

const register = async (req: Request, res: Response) => {
  const body: IUser = req.body;
  const isExist = await User.findOne({
    email: body.email,
  });
  if (isExist) {
    return res.status(403).json({
      statusCode: 403,
      message: "Email already exist!",
      data: null,
    } as IResponse);
  }
  const newUser = await UserServices.handleCreateUser(body);
  if (newUser) {
    return res.status(201).json({
      statusCode: 201,
      message: "OK!",
      data: newUser,
    } as IResponse);
  } else {
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error!",
      data: null,
    } as IResponse);
  }
};

const login = async (req: Request, res: Response) => {
  const body: ILoginForm = req.body;
  const data = await UserServices.handleLogin(body);
  return res.status(data.statusCode).json(data);
};

const loginGoogle = async (req: Request, res: Response) => {
  const body: ILoginSocialForm = req.body;
  if (!body.fullName || !body.avatar || !body.email) {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request!",
      data: null,
    } as IResponse);
  }
  const data = await UserServices.handleLoginGoogle(body);
  return res.status(data.statusCode).json(data);
};

const loginGithub = async (req: Request, res: Response) => {
  const body: ILoginSocialForm = req.body;
  if (!body.fullName || !body.avatar || !body.email) {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request!",
      data: null,
    } as IResponse);
  }
  const data = await UserServices.handleLoginGithub(body);
  return res.status(data.statusCode).json(data);
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request: Missing id!",
      data: null,
    } as IResponse);
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request: Invalid id!",
      data: null,
    } as IResponse);
  }
  const data = await UserServices.handleDeleteUser(id);
  return res.status(data.statusCode).json(data);
};

const getAll = async (req: Request, res: Response) => {
  const userId = req.user;
  const page = parseInt(req.query?.page as string) || 1;
  const pageSize = parseInt(req.query?.pageSize as string) || 50;

  const data = await UserServices.handleGetAll(
    page,
    pageSize,
    userId as string
  );
  if (data) {
    return res.status(data.statusCode).json(data);
  }
  return res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error!",
    data: null,
  } as IResponse);
};

const UserControllers = {
  register,
  login,
  loginGoogle,
  loginGithub,
  deleteUser,
  getAll,
};

export default UserControllers;
