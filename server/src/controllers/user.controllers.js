import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";

export const signupUser = async (req, res, next) => {
  try {
    const { username, firstname, lastname, email, password } = req.body;
    console.log(username, firstname, lastname, email, password);
    if (
      [username, firstname, lastname, email, password].some(
        (field) => field?.trim() === "" || field === undefined,
      )
    ) {
      throw new Error("An input field is empty");
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      throw new Error("User already exist");
    }

    const user = await User.create({
      username: username,
      firstName: firstname,
      secondName: lastname,
      email: email,
      password: password,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    return res.status(200).json(new ApiResponse(200, createdUser));
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const signinUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (
      [username, password].some(
        (field) => field?.trim() === "" || field === undefined,
      )
    ) {
      throw new Error("An input field is empty or undefined");
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { password }],
    });
    console.log(existedUser);
    if (!existedUser) {
      throw new Error("User not registered");
    }

    const passwordCorrect = await existedUser.isPasswordCorrect(password);

    if (!passwordCorrect) {
      throw new Error("User password wrong");
    }
    res.status(200).json(new ApiResponse(200, "user logged in successfully"));
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    console.log("i am otp");
    const { email } = req.body;
    console.log(email);

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      throw new Error("Invalid email address");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    // Store OTP in user document
    const newUserData = await User.updateOne(
      { _id: user._id },
      {
        resetPasswordOtp: otp,
        resetPasswordOtpExpiry: otpExpiry,
      },
    );
    console.log(newUserData);
    // Send OTP to user's email
    // await sendEmail({
    //   to: user.email,
    //   subject: "Password Reset OTP",
    //   text: `Your OTP for password reset is: ${otp}. It will expire in 15 minutes.`,
    // });

    res.status(200).json(new ApiResponse(200, "OTP sent to email"));
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate inputs
    if (!email || !otp || !newPassword) {
      throw new Error("All fields are required");
    }

    // Find user and check OTP
    const user = await User.findOne({
      email,
      resetPasswordOtp: otp,
      resetPasswordOtpExpiry: { $gt: new Date() },
    });

    if (!user) {
      throw new Error("Invalid or expired OTP");
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpiry = undefined;
    await user.save();

    // Send confirmation email
    // await sendEmail({
    //   to: user.email,
    //   subject: "Password Reset Successful",
    //   text: "Your password has been successfully reset.",
    // });

    res.status(200).json(new ApiResponse(200, "Password reset successful"));
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
};

// chat page displays as user registers
// uploads a file
// chat/1lkjlkje34rqlwk234lk2 page opens up with an id
// chat begins
// those three buttons are for special requests -simplification, definition search, query)
