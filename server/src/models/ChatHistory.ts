import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    role: {
      type: String,
    },
    content: {
      type: String,
    }
  },
  { _id: false } 
);

const ChatHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chatID: {
    type: String,
  },
  asset_id:{
    type: String,
  },
  public_id:{
    type: String,
  },
  pdfUrl:{
    type: String,
  },
  title: {
    type: String,
  },
  pdfSecureUrl: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  conversation: [ConversationSchema], 
});

export default mongoose.model("ChatHistory", ChatHistorySchema);
