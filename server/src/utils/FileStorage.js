import multer from "multer";
import { join } from "path";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Get username from authenticated request
    const username = req?.user?.username || "akash_sah";
    if (!username) {
      return cb(new Error("User not authenticated"));
    }

    // Set destination to user's directory
    const userDir = join("data", username);
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    // Keep original filename
    cb(null, file.originalname);
  },
});

// File filter to only allow PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// Create multer middleware
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB currently. Utilize payment model to determine the file size.
  },
});
