import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

export interface AuthRequest extends Request {
  userId?: string;
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(400)
      .json({ success: false, message: "Unauthorized - no token provided." });
  try {
    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
