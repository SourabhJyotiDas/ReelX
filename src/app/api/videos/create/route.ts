import { connectToDatabase } from "@/app/lib/database";
import Video from "../../../models/Video";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/options";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not loggedIn" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      controls = true,
      transformation,
    } = await req.json();
    if (!title || !description || !videoUrl || !thumbnailUrl) {
      return NextResponse.json(
        { success: false, message: "Fill all the feilds" },
        { status: 400 }
      );
    }
    await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      controls,
      transformation: {
        height: 1920,
        width: 1080,
        quality: transformation?.quality ?? 100,
      },
    });

    return NextResponse.json(
      { success: true, message: "Video uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
