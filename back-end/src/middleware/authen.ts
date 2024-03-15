import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IResponse } from "../types/interface";

const verifyJwtToken = (
  token: string,
  secretKey: string
): Promise<{ _id: string }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as { _id: string });
    });
  });
};

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (token) {
    try {
      const decoded = await verifyJwtToken(
        token,
        process.env.TOKEN_SECRET as string
      );
      req.user = decoded?._id as string;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized access!",
        data: null,
      } as IResponse);
    }
  } else {
    return res.status(403).json({
      statusCode: 403,
      message: "No token provided!",
      data: null,
    });
  }
};
