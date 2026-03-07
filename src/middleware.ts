import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = await getToken({
    req,
    cookieName:
      process.env.NODE_ENV === "development"
        ? "next-auth.session-token"
        : "__Secure-next-auth.session-token",
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session && pathname.startsWith("/panel-administracion")) {
    if (session.role === "customer") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (!session && pathname.startsWith("/panel-administracion")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!session && pathname.startsWith("/perfil")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    session &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
