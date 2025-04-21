import mongoose, { Schema, Model } from "mongoose";

// Define Video Schema
const VideoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    controls: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Create or Retrieve Mongoose Model
const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema);


export default Video;
