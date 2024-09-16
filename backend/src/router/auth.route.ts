import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/auth.controller";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password/", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
