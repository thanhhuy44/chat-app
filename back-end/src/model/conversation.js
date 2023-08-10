import mongoose from "mongoose";
import Message from "./message.js";
const Schema = mongoose.Schema;
const ConversationSchema = new Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  type: {
    type: String,
    default: "USER",
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  // unread: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //     count: {
  //       type: Number,
  //       default: 0,
  //     },
  //   },
  // ],
});

const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;
