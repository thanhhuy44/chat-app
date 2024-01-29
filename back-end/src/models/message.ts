import mongoose from 'mongoose';
import Room from './room';
import { EMessage } from '../types/enum';
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  seenBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  repliedMessage: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  type: {
    type: String,
    enum: EMessage,
    default: EMessage.Text,
  },
  text: {
    type: String,
    required: false,
  },
  images: [
    {
      type: String,
      required: false,
    },
  ],
  files: [
    {
      type: String,
      required: false,
    },
  ],
  videos: [
    {
      type: String,
      required: false,
    },
  ],
  reactions: [
    {
      type: String,
      required: false,
    },
  ],
  isDeleted: {
    type: Boolean,
    required: false,
  },
  isPin: {
    type: Boolean,
    required: false,
  },
});

MessageSchema.pre('save', async function (next) {
  let message = this;
  message.seenBy = [...new Set(message.seenBy)];
  await Room.findByIdAndUpdate(
    {
      _id: message.room,
    },
    {
      lastMessage: message._id,
    }
  );
  next();
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;
