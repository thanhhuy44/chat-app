import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },

    birthDay: {
      type: Date,
      required: false,
      default: Date.now(),
    },
    password: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      required: true,
      default: false,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
      },
    ],
  },
  {
    toJSON: {
      transform(_, user) {
        delete user.password;
      },
    },
  }
);

UserSchema.pre('save', function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, (_, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);
export default User;
