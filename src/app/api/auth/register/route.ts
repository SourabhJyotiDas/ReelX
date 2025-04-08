import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/database";
import User from "../../../models/User";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and Password are required",
        },
        { status: 400 }
      );
    }
    await connectToDatabase();

    let user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          success: false,
          message: "A User with this email is already exist.",
        },
        { status: 400 }
      );
    }

    user = await User.create({
      email,
      password,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
