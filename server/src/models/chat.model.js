import mongoose from "mongoose";
import { Document } from "./document.model.js";

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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Document,
  },
  conversation: [ConversationSchema],
});

ChatHistorySchema.methods.addConversation = function (role, content) {
  this.conversation.push({ role, content });
  return this.save();
};

ChatHistorySchema.methods.clearConversation = function () {
  this.conversation = [];
  return this.save();
};

export const Chat = mongoose.model("ChatHistory", ChatHistorySchema);
