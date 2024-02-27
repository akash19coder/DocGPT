import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import ChatHistory from "../models/ChatHistory.js";
// Cloudinary configuration
//TODO: need to put it into env file
cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_NAME,
    cloud_name: "dmyjhicsl",
    // api_key: process.env.CLOUDINARY_API_KEY,
    api_key: "822545885516375",
    // api_secret: process.env.CLOUDINARY_API_SECRET,
    api_secret: "bY84kME2oPJzpdFlBvSJJ2cYCfk",
});
// Cloudinary upload function
const uploadFileOnCloudinary = async (req, res, next, filePath) => {
    try {
        console.log('The req locals:', req.locals);
        cloudinary.uploader.upload(filePath, {
            public_id: `${req.locals.originalName}`,
            resource_type: "raw",
            asset_folder: req.locals.id,
            use_asset_folder_as_public_id_prefix: true,
        }, async function (error, result) {
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
            const response = await ChatHistory.findByIdAndUpdate(userChatHistory._id, {
                asset_id: result.asset_id,
                public_id: result.public_id,
                pdfUrl: result.url,
                pdfSecureUrl: result.secure_url,
            }, { new: true });
            req.locals = response._id.toString();
            console.log("The cloudinary response is:", result);
            next();
        });
    }
    catch (error) {
        console.error("An unexpected error occurred:", error);
        next(error);
    }
};
// Multer middleware to handle file upload
const uploadMiddleware = (req, res, next) => {
    const filePath = req.file.path;
    uploadFileOnCloudinary(req, res, next, filePath);
};
export default uploadMiddleware;
//# sourceMappingURL=cloudinary.js.map