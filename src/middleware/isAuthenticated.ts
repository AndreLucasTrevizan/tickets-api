import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

interface IPayload {
  code: string;
  role: string;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const has_auth = req.headers.authorization;

  if (!has_auth) return res.status(401).end();

  try {
    const token = has_auth.split(' ')[1];

    req.user = verify(token, String(process.env.JWT_SECRET)) as IPayload;


    next();
  } catch (error) {
    return res.status(401).end();
  }
};
