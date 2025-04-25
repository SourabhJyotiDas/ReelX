import { connectToDatabase } from "@/lib/database";
import Video from "@/models/Video";

export async function GET(req) {
   await connectToDatabase();

   try {

     const videos = await Video.find({});

      return Response.json(
         {
            success: true,
            videos
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
