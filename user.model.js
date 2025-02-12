
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true , required: true},
  username: { type: String, required: true },
  password: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
});

export const users = mongoose.model("User", UserSchema);

