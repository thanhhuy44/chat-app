import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ConversationSchema = new Schema({
  member: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  message: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
export default User;
