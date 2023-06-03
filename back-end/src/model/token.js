import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const UserToken = mongoose.model('UserToken', UserTokenSchema);
export default UserToken;
