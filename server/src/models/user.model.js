import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Chat } from "./chathistory.model.js";
import { type } from "os";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 14,
      validate: (v) => {
        // Check if username contains only allowed characters
        if (!/^[a-z0-9_]+$/.test(v)) {
          throw new Error(
            "Username can only contain lowercase letters, numbers, and underscore",
          );
        }
        // Check if username is not only numbers
        if (/^\d+$/.test(v)) {
          throw new Error("Username cannot contain only numbers");
        }
        // Check if username is not only underscores
        if (/^_+$/.test(v)) {
          throw new Error("Username cannot contain only underscores");
        }
      },
    },
    name: {
      type: String,
      required: true,
      validate: (v) => {
        if (!/^[a-zA-Z\s]+$/.test(v)) {
          throw new Error(
            "Name can only contain letters (a-z, A-Z) and spaces",
          );
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate: (v) => {
        if (!validator.isStrongPassword(v)) {
          throw new Error("Enter strong password");
        }
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: (v) => {
        if (!validator.isEmail(v)) {
          throw new Error("Enter valid email");
        }
      },
    },
    imageUrl: {
      type: String,
      default: "",
      validate: (v) => {
        const error = validator.isURL(v);
        if (error) {
          throw new Error("image url invalid");
        }
      },
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  console.log("i executed");
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

export const User = mongoose.model("User", userSchema);
