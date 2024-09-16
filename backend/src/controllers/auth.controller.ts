import bcryptjs from "bcryptjs";
import { randomBytes } from "crypto";
import { NextFunction, Request, Response } from "express";
import config from "../config/config";
import { User } from "../models/user.model";
import { UserType } from "../types/user.type";
import { genrateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";
import { sentResetPassword } from "../utils/sentResetPasswordEmail";
import { sentVerificationEmail } from "../utils/sentVerificationEmail";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }

    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    sentVerificationEmail({ email, name, code: verificationToken });

    const hashPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresAt,
    });

    const userDTO = user.toObject() as UserType;

    genrateTokenAndSetCookie(res, userDTO._id);

    res.status(201).json({
      status: "success",
      message: "User creation successfull.",
      user: {
        ...userDTO,
        password: undefined,
      },
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    const matchPassword = await bcryptjs.compare(
      password,
      user?.password as string
    );

    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: "Wrong credentials.",
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const userDTO = user.toObject();

    genrateTokenAndSetCookie(res, user?._id as string);

    res.status(200).json({
      success: true,
      message: "Login successfully.",
      user: {
        ...userDTO,
        password: undefined,
      },
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logout successfully.",
  });
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {
        $gte: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or verification token expired.",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    const userDTO = user.toObject();

    res.status(200).json({
      success: true,
      message: "Email varified successfully.",
      user: {
        ...userDTO,
        password: undefined,
      },
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    const resetToken = randomBytes(20).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1hr

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    const resetLink = `${config.clientBaseUrl}/reset-password/${resetToken}`;
    await sentResetPassword({ email, resetLink, name: user.name });

    res.status(200).json({
      success: true,
      message: "Reset password link sent to your email successfully.",
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: {
        $gte: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expire token.",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    user.save();

    res.status(200).json({
      success: true,
      message: "Reset password successfully.",
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
