import mongoose from 'mongoose';
import { TypeRoom } from '../types/enum';
const Schema = mongoose.Schema;
const RoomSchema = new Schema({
  name: {
    type: String,
    require: false,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      select: false,
    },
  ],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  type: {
    type: String,
    enum: TypeRoom,
    default: TypeRoom.Single,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Room = mongoose.model('Room', RoomSchema);
export default Room;
