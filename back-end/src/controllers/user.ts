import { Request, Response } from 'express';
import User from '../models/user';
import { ILoginForm, IResponse, IUser } from '../types/interface';
import UserServices from '../services/user';

const register = async (req: Request, res: Response) => {
  const body: IUser = req.body;
  const isExist = await User.findOne({
    email: body.email,
  });
  if (isExist) {
    return res.status(403).json({
      statusCode: 403,
      message: 'Email already exist!',
      data: null,
    } as IResponse);
  }
  const newUser = await UserServices.handleCreateUser(body);
  if (newUser) {
    return res.status(201).json({
      statusCode: 201,
      message: 'OK!',
      data: newUser,
    } as IResponse);
  } else {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error!',
      data: null,
    } as IResponse);
  }
};

const login = async (req: Request, res: Response) => {
  const body: ILoginForm = req.body;
  const data = await UserServices.handleLogin(body);
  return res.status(data.statusCode).json(data);
};

const UserControllers = {
  register,
  login,
};

export default UserControllers;
