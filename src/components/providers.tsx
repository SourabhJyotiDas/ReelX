"use client";

import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function providers({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    const res = await fetch("/api/imagekit-auth");

    if (!res.ok) {
      throw new Error("Failed to fetch ImageKit auth");
    }

    const data = await res.json();

    console.log("Frontend received:", data);

    return {
      token: data.token,
      signature: data.signature,
      expire: data.expire,
    };
  };

  return (
    <SessionProvider>
      <ImageKitProvider
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}>
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
