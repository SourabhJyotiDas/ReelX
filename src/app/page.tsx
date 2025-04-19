
"use client";

import FileUpload from "@/components/fileUpload";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Upload an Image</h1>
      <FileUpload />
    </main>
  );
}
