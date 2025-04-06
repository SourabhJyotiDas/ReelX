import { authOptions } from "@/app/lib/options";
import nextAuth from "next-auth";

const handler = nextAuth(authOptions);

