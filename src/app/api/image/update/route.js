import User from "@/models/User";
import Post from "@/models/Post";

export async function POST(req) {
   await connectToDatabase();

   try {
      const urlString = req.url;
      const url = new URL(urlString);

      const searchParams = new URLSearchParams(url.search);
      const userId = searchParams.get("userId");

      const { postId, caption } = await req.json();

      if (!userId) {
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

      const post = await Post.findById(postId);
      if (!post) {
         return Response.json(
            {
               success: false,
               message: "Post not found.",
            },
            { status: 404 }
         );
      }

      const matchUser = post.user.equals(user._id);

      if (!matchUser) {
         return Response.json(
            {
               success: false,
               message: "permission not allowed",
            },
            { status: 401 }
         );
      }

      post.caption = caption;

      await post.save()

      return Response.json(
         {
            success: true,
            message: "Post updated successfully.",
         },
         { status: 200 }
      );
   } catch (error) {
      return Response.json(
         {
            success: false,
            message: error.message || "Something went wrong.",
         },
         { status: 500 }
      );
   }
}
