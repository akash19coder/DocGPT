import Router from "express";
import {
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
router.route("/request-password-reset").post(requestPasswordReset);
router.use("/reset-password", userAuth, resetPassword);
router.use("/signout", userAuth, signOut);

export default router;
