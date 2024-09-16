import { Router } from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
} from "../controllers/auth.controller";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);

router.post("/verify-email", verifyEmail);

export default router;
