import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  },
  text: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model('Message', MessageSchema);
export default User;
