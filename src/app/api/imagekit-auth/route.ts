import ImageKit from "imagekit";
import { NextResponse, NextRequest } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
  try {
    const authenticationParams = imagekit.getAuthenticationParameters();

    return NextResponse.json(
      { success: true, authenticationParams },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Image kit auth failed" },
      { status: 500 }
    );
  }
}
