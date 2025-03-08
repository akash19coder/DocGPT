import mongoose from "mongoose";
import validator from "validator";

const DocumentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Document name is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return value.length >= 3 && value.length <= 100;
        },
        message: "Document name must be between 3 and 100 characters",
      },
    },
    size: {
      type: Number,
      required: [true, "File size is required"],
      validate: {
        validator: function (value) {
          // Maximum file size of 10MB (10 * 1024 * 1024 bytes)
          return value > 0 && value <= 10485760;
        },
        message: "File size must be between 0 and 10MB",
      },
    },
    cloudinary_id: {
      type: String,
      required: [true, "Cloudinary ID is required"],
      validate: {
        validator: function (value) {
          // Basic validation for cloudinary public ID format
          return (
            validator.isLength(value, { min: 1, max: 100 }) &&
            validator.matches(value, /^[a-zA-Z0-9_\-\/]+$/)
          );
        },
        message: "Invalid Cloudinary ID format",
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid User ID format",
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Document = mongoose.model("Document", DocumentSchema);
