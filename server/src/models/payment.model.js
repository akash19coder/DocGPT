import mongoose from "mongoose";
import validator from "validator";

const PaymentSchema = new mongoose.Schema(
  {
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
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Payment amount must be greater than 0",
      },
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      uppercase: true,
      validate: {
        validator: function (value) {
          return validator.isLength(value, { min: 3, max: 3 });
        },
        message: "Currency must be a 3-letter code (e.g., USD, EUR)",
      },
    },
    status: {
      type: String,
      required: [true, "Payment status is required"],
      enum: {
        values: ["pending", "completed", "failed"],
        message: "Status must be either pending, completed, or failed",
      },
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: {
        values: ["credit_card", "debit_card", "bank_transfer"],
        message: "Invalid payment method",
      },
    },
    transactionId: {
      type: String,
      required: [true, "Transaction ID is required"],
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isLength(value, { min: 10, max: 100 });
        },
        message: "Transaction ID must be between 10 and 100 characters",
      },
    },
    plan: {
      type: String,
      required: [true, "Plan type is required"],
      enum: {
        values: ["free", "pro"],
        message: "Plan must be either free or pro",
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = mongoose.model("Payment", PaymentSchema);
