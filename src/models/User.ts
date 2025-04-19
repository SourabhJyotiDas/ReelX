import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  phone: String,
  image:String,
  role: { type: String, enum: ["customer", "admin", "seller"], default: "customer" },
  gender: { type: String, enum: ["male", "female", "others"], default: "male" },
  verify: { type: Boolean, default: false },
  verificationCode: Number
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Create or Retrieve Mongoose Model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
