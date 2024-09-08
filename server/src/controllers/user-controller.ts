import { Request, Response, NextFunction } from "express";

import User from "../models/User.js";
import { setCookie } from "../utils/cookie-manager.js";
import { sendVerificationCode } from "../utils/nodemailer.js";
import { generateOTP, storeOTP } from "../utils/otp.js";

class userController {
  static loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(401).json({
          error: "Unauthorized",
          message: "Invalid email or password.",
        });
      }

      if (user.password == password) {
        await setCookie(req, res, email);
        return res
          .status(200)
          .json({ success: "Success", name: user.username, email: user.email });
      } else {
        return res
          .status(403)
          .json({ error: "Forbidden", message: "Incorrect password." });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong.",
      });
    }
  };

  static signupUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { username, email, password } = req.body;
      
      // Check if the email already exists
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        console.log('Email already exists');
        return res
          .status(400)
          .json({ error: "Bad Request", message: "Email already exists." });
      }
      
      // Create a new user
      const newUser = new User({ username, email, password });
      const savedUser = await newUser.save();

      const otp = generateOTP(4);
      
      sendVerificationCode(email,otp);

      await storeOTP(savedUser.id,otp);
      // Set cookie
      await setCookie(req, res, savedUser.email);

      return res.status(201).json({
        success: "Created",
        name: savedUser.username,
        email: savedUser.email,
      }); 
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error during user registration:", error);

      // Check for specific error types e.g(., validation errors)
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ error: "Bad Request", message: error.message });
      }
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong.",
      });
    }
  };

  static authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // Check if the email already exists
      const user = await User.findOne({ email: res.locals.jwtData.name });

      if (!user) {
        return res
          .status(401)
          .json({ error: "Bad Request", message: "User not registered" });
      }
      
      if (user.email !== res.locals.jwtData.name) {
        return res.status(401).json({ message: "Permission Denied" });
      }

      return res
        .status(200)
        .json({ message: "OK", name: user.username, email: user.email });
    } catch (error) {
      // Handle any unexpzzected errors
      console.error("Error during user token verification :", error);

      // Check for specific error types e.g(., validation errors)
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ error: "Bad Request", message: error.message });
      }

      return res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong.",
      });
    }
  };

  static uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // res.status(200).json({ message: "OK", data: `${req.file.path}` });
  };
}

export default userController;
