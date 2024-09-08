import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const getUserFromToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userToken = req.signedCookies["auth-token"];
  const privateKey = process.env.JWT_PRIVATE_KEY;

  const decoded = jwt.verify(userToken, privateKey);
  req.locals = decoded;
  console.log('I am exiting getUserFromToken');
  next();
};
