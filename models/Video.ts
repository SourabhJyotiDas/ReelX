import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";


export const VIDEO_DIMENSIONS = {
   height:1920
   width:1080,
} as const

// Define User Interface
export interface IVideo {
   _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  controls?: boolean;
   transformation?:{
      height:number
      width:number
      quality?:number
   }
  createdAt?: Date;
  updatedAt?: Date;
}

// Define Video Schema
const VideoSchema: Schema<IVideo> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    controls: { type: Boolean,default:true },
    transformation:{
      height:{type:Number,default:VIDEO_DIMENSIONS.height},
      width:{type:Number,default:VIDEO_DIMENSIONS.width},
      quality:{type:Number,min:1, max:100}
    },
    
  },
  { timestamps: true }
);

// Create or Retrieve Mongoose Model
const Video: Model<IVideo> = mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
