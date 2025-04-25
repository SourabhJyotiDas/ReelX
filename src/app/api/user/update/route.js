import User from "@/models/User";
import { connectToDatabase } from "@/lib/database";


export async function POST(req) {
  await connectToDatabase();

  try {
    const urlString = req.url;
    const url = new URL(urlString);

    const searchParams = new URLSearchParams(url.search);
    const userId = searchParams.get('userId');

    const { name, username, bio, phone, gender, imageUrl } = await req.json();

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

    // Update user fields
    user.name = name || user.name;
    user.username = username || user.username;
    user.phone = phone || user.phone;
    user.bio = bio || user.bio;
    user.gender = gender || user.gender;
    user.image = imageUrl || user.image; // assuming 'url' means profile image

    await user.save();

    return Response.json(
      {
        success: true,
        message: "Profile updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile Update Error:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
