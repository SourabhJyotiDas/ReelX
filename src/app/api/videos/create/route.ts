import { connectToDatabase } from "@/app/lib/database";
import Video from "../../../models/Video";
import { NextResponse } from "next/server";

export async function GET(params: type) {
  try {
    await connectToDatabase();
    const videos = await Video.find({});

    return NextResponse.json({ success: true, videos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
