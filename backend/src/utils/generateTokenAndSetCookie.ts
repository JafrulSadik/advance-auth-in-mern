import { Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const genrateTokenAndSetCookie = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, config.jwtSecret as string, {
    expiresIn: "7D",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
