import User from "@/models/User";
import { connectToDatabase } from "@/lib/database";
import bcrypt from "bcryptjs";

export async function POST(req) {
   await connectToDatabase();

   try {
      const urlString = req.url;
      const url = new URL(urlString);

      const searchParams = new URLSearchParams(url.search);
      const userId = searchParams.get('userId');

      const { password } = await req.json();

      if (!userId) {
         return Response.json(
            {
               success: false,
               message: "User ID not provided.",
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

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return Response.json(
            {
               success: false,
               message: "Incorrect password.",
            },
            { status: 401 }
         );
      }

      // Delete the user
      await User.deleteOne({ _id: userId });

      return Response.json(
         {
            success: true,
            message: "User deleted successfully.",
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("Delete User Error:", error);
      return Response.json(
         {
            success: false,
            message: error.message || "Something went wrong.",
         },
         { status: 500 }
      );
   }
}
