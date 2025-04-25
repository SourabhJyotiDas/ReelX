import mongoose, { Schema, Model } from "mongoose";

// Define Video Schema
const VideoSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    thumbnailUrl: { type: String },
    caption: String,
    videoUrl: String,
  },
  { timestamps: true }
);

// Create or Retrieve Mongoose Model
const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema);


export default Video;
