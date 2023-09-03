import { NextFunction, Request, Response } from 'express';

export const errors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Error) {
    return res.status(400).json({ msg: err.message });
  }

  return res.status(500).json({
    status: 'error',
    msg: 'Internal server error'
  });
};