import Router from "express";
import {
  getUserProfile,
  requestPasswordReset,
  resetPassword,
  signinUser,
  signOut,
  signupUser,
} from "../controllers/user.controllers.js";
import { userAuth } from "../middleware/userAuth.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/signin").post(signinUser);

//Protected Routes
router.route("/request-password-reset").post(userAuth, requestPasswordReset);
router.route("/reset-password").post(userAuth, resetPassword);
router.route("/signout").post(userAuth, signOut);
router.route("/profile").get(userAuth, getUserProfile);

export default router;
