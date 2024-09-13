import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    role: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { _id: false },
);

const ChatHistorySchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  conversation: [ConversationSchema],
});

export const Chat = mongoose.model("ChatHistory", ChatHistorySchema);
