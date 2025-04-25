import User from "@/models/User";
import Post from "@/models/Post";
import { connectToDatabase } from "@/lib/database";
import bcrypt from "bcryptjs";
import Hashtag from "../../../../models/Hashtag";

export async function POST(req) {
   await connectToDatabase();

   try {
      const urlString = req.url;
      const url = new URL(urlString);

      const searchParams = new URLSearchParams(url.search);
      const userId = searchParams.get("userId");

      const { imageUrl, caption, tags = [] } = await req.json();

      if (!userId || !imageUrl) {
         return Response.json(
            {
               success: false,
               message: "Required params not provided.",
            },
            { status: 400 }
         );
      }

      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
         return Response.json(
            {
               success: false,
               message: "User not found.",
            },
            { status: 404 }
         );
      }

      const newPost = await Post.create({
         user: user._id,
         image: imageUrl,
         caption,
      });

      for (const tag of tags) {
         await Hashtag.create({
            tag,
            posts: newPost._id,
         });
      }

      return Response.json(
         {
            success: true,
            message: "Post created successfully.",
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
