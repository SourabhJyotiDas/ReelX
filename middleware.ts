import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    //  console.log(req.nextauth.token)
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        //  return token?.role === "admin",
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        if (pathname === "/" || pathname.startsWith("/ap[oi/videos")) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/admin"] };
