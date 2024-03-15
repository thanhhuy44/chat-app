import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    avatar: {
      type: String,
      required: true,
      default:
        "https://my-blog-assets.s3.us-east-005.backblazeb2.com/default_avatar.png",
    },
    birthDay: {
      type: Date,
      required: false,
      default: Date.now(),
    },
    password: {
      type: String,
      required: true,
      default: "123456789x@X",
    },
    isOnline: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    toJSON: {
      transform(_, user) {
        delete user.password;
      },
    },
  }
);

UserSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, (_, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);
export default User;
