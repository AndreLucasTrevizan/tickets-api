import { NextFunction, Request, Response } from "express";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Você precisa ter previlégios administrativos para seguir' });
  }

  next();
};
