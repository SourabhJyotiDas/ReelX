
import User from "@/models/User";
import { connectToDatabase } from "@/lib/database";

export async function POST(req) {
  await connectToDatabase();

  try {
    const { name, email, image } = await req.json();

    if (!name || !email) {
      return Response.json(
        {
          success: false,
          message: "Fields should not empty"
        },
        { status: 500 }
      );
    }

    let user = await User.findOne({ email });

    if (user) {
      return Response.json(
        {
          success: true,
          message: `Welcome back ${user.name}`
        },
        { status: 200 }
      );
    }

    user = await User.create({ name, email, image })

    return Response.json(
      {
        success: true,
        message: "User registered successfully"
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