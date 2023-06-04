import mongoose from "mongoose";
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

MessageSchema.pre("save", function (next) {
  let message = this;
  message.seenBy = [...new Set(message.seenBy)];
  next();
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;
