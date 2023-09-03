declare namespace Express {
  export interface Request {
    user: {
      code: string,
      role: string
    }
  }
}