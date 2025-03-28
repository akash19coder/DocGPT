import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileOnCloudinary = async (filepath, originalName, id) => {
  const uploadResult = await cloudinary.uploader
    .upload(filepath, {
      public_id: `${originalName}`,
      resource_type: "raw",
      asset_folder: id,
      use_asset_folder_as_public_id_prefix: true,
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);
  return uploadResult;
};

// // Multer middleware to handle file upload
// const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const filePath = req.file.path;
//   uploadFileOnCloudinary(req, res, next, filePath);
// };

//for later use in Cloudinary file upload
// ,
