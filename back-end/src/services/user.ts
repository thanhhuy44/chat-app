import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import {
  ILoginForm,
  ILoginSocialForm,
  IResponse,
  IUser,
} from "../types/interface";

const handleCreateUser = async (body: IUser) => {
  try {
    const newUser = await User.create(body);
    if (newUser) {
      return newUser;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const handleLogin = async (body: ILoginForm): Promise<IResponse> => {
  const user = await User.findOne({ email: body.email });
  if (user) {
    const isSamePassword = await bcrypt.compare(body.password, user.password);
    if (isSamePassword) {
      let token = jwt.sign(
        { _id: user._id },
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: "1h",
        }
      );
      return {
        statusCode: 200,
        message: "OK",
        data: user,
        token,
      };
    } else {
      return {
        statusCode: 401,
        message: "Wrong password",
        data: null,
      };
    }
  } else {
    return {
      statusCode: 404,
      message: "Not found!",
      data: null,
    };
  }
};

const handleLoginGoogle = async (
  body: ILoginSocialForm
): Promise<IResponse> => {
  console.log("🚀 ~ handleLoginGoogle ~ body:", body);
  const user = await User.findOne({
    email: body.email,
    fullName: body.fullName,
  });
  if (user) {
    return {
      statusCode: 200,
      message: "OK!",
      data: user,
    };
  } else {
    const newUser = await User.create(body);
    if (newUser) {
      return {
        statusCode: 200,
        message: "OK!",
        data: newUser,
      };
    } else {
      return {
        statusCode: 500,
        message: "Internal Server Error!",
        data: null,
      };
    }
  }
};

const handleLoginGithub = async (
  body: ILoginSocialForm
): Promise<IResponse> => {
  const user = await User.findOne({
    email: body.email,
    fullName: body.fullName,
  });
  if (user) {
    return {
      statusCode: 200,
      message: "OK!",
      data: user,
    };
  } else {
    const newUser = await User.create(body);
    if (newUser) {
      return {
        statusCode: 200,
        message: "OK!",
        data: newUser,
      };
    } else {
      return {
        statusCode: 500,
        message: "Internal Server Error!",
        data: null,
      };
    }
  }
};

const handleDeleteUser = async (id: string): Promise<IResponse> => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (deletedUser) {
    return {
      statusCode: 200,
      message: "OK!",
      data: deletedUser._id,
    };
  } else {
    return {
      statusCode: 404,
      message: "Not found!",
      data: null,
    };
  }
};

const UserServices = {
  handleCreateUser,
  handleLogin,
  handleLoginGoogle,
  handleLoginGithub,
  handleDeleteUser,
};

export default UserServices;
