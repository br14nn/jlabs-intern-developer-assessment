import { NextResponse, type NextRequest } from "next/server";
import { authVerify } from "./lib/api/auth.api";

export async function proxy(request: NextRequest) {
  let accessToken = request.cookies.get("access_token")?.value;

  const { error } = await authVerify(accessToken!);

  if (request.nextUrl.pathname === "/login" && !error) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname !== "/login" && error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon|.well-known|.*\\.png$).*)",
  ],
};
