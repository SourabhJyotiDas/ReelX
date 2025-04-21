import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String },
  bio: { type: String },
  email: { type: String, unique: true, required: true },
  phone: String,
  image: String,
  gender: { type: String, enum: ["male", "female", "others"], default: "male" },
  password: String,
  role: { type: String, enum: ["user", "premium-user"], default: "user" },
  verify: { type: Boolean, default: false },
  verificationCode: Number
}, { timestamps: true });


const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
