import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import ChatHistory from "../models/ChatHistory.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary upload function
const uploadFileOnCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction,
  filePath: string,
) => {
  try {
    console.log('The req locals:', req.locals);
    cloudinary.uploader.upload(
      filePath,
      {
        public_id: `${req.locals.originalName}`,
        resource_type: "raw",
        asset_folder: req.locals.id,
        use_asset_folder_as_public_id_prefix: true,
      },
      async function (error, result) {
        if (error) {
          return next(error);
        }

        // Create a new instance of ChatHistory with _id field
        const userChatHistory = new ChatHistory({
          _id: new mongoose.Types.ObjectId(), // Assin a new ObjectId as _id
          userId: req.locals.id,
          chatID: req.params.chatID
        });

        await userChatHistory.save();

        const response = await ChatHistory.findByIdAndUpdate(
          userChatHistory._id,
          {
            asset_id: result.asset_id,
            public_id: result.public_id,
            pdfUrl: result.url,
            pdfSecureUrl: result.secure_url,
          },
          { new: true },
        );
        req.locals = response._id.toString();
        console.log("The cloudinary response is:", result);
        next();
      },
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    next(error);
  }
};

// Multer middleware to handle file upload
const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const filePath = req.file.path;
  uploadFileOnCloudinary(req, res, next, filePath);
};

export default uploadMiddleware;
