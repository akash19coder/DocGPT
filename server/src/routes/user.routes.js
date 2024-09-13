import Router from "express";
import {
  requestPasswordReset,
  resetPassword,
  signinUser,
  signupUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/signin").post(signinUser);
router.route("/request-password-reset").post(requestPasswordReset);
router.route("/reset-password").post(resetPassword);

export default router;
