import User from "@/models/User";
import Post from "@/models/Post";
import { connectToDatabase } from "@/lib/database";
import bcrypt from "bcryptjs";
import Hashtag from "../../../../models/Hashtag";

export async function GET(req) {
   await connectToDatabase();

   try {

     const images = await Post.find({});

      return Response.json(
         {
            success: true,
            images
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("Create Post Error:", error);
      return Response.json(
         {
            success: false,
            message: error.message || "Something went wrong.",
         },
         { status: 500 }
      );
   }
}
