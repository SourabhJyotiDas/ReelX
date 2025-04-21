import { connectToDatabase } from "@/app/lib/database";
import Video from "@/app/models/Video";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, videos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
