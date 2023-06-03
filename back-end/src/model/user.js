import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthDay: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    password: {
      type: String,
      required: true,
      selected: false,
    },
  },
  {
    toJSON: {
      transform(doc, user) {
        delete user.password;
      },
    },
  }
);

UserSchema.pre('save', function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);
export default User;
