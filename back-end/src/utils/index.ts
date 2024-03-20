import mongoose from "mongoose";

export const checkId = (id?: string) => {
  return id ? mongoose.Types.ObjectId.isValid(id) : false;
};
