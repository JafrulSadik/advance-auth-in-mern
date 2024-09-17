import { Router } from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password/", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", verifyToken, checkAuth);
export default router;
