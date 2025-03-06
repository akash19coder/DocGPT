import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 10, // Document will be automatically deleted after 15 minutes (900 seconds)
  },
  verified: {
    type: Boolean,
    default: false,
  },
  purpose: {
    type: String,
    enum: ["PASSWORD_RESET", "EMAIL_VERIFICATION"],
    required: true,
  },
});

// Create index on createdAt field for TTL
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 });

export const OTP = mongoose.model("OTP", otpSchema);
