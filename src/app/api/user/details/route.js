
import User from "@/models/User";
import {connectToDatabase} from "@/lib/database";


export async function GET(req) {
  await connectToDatabase();

  try {

    const urlString = req.url;
    const url = new URL(urlString);

    const searchParams = new URLSearchParams(url.search);
    const userId = searchParams.get('userId');


    let user = await User.findById(userId);

    if (!user) {
      return Response.json(
         {
            success: false,
            message: "User not exist..!",
         },
         { status: 500 }
      );
   };
   

    return Response.json(
      {
        success: true,
        user
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
};