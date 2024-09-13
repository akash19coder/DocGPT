import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileOnCloudinary = async () => {
  const uploadResult = await cloudinary.uploader
    .upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
      public_id: 'shoes',
    }
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);
}

// // Multer middleware to handle file upload
// const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const filePath = req.file.path;
//   uploadFileOnCloudinary(req, res, next, filePath);
// };


//for later use in Cloudinary file upload
// ,
//       {
//         public_id: `${req.locals.originalName}`,
//         resource_type: "raw",
//         asset_folder: req.locals.id,
//         use_asset_folder_as_public_id_prefix: true,
//       },

