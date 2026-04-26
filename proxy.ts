// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// export default function proxy(request: NextRequest) {
//   const token = request.cookies.get("refresh")?.value;
//   const { pathname } = request.nextUrl;

//   if (!token && !pathname.startsWith("/login")) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("reason", "auth-required");
//     return NextResponse.redirect(loginUrl);
//   }

//   if (token && pathname.startsWith("/login")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PROTECTED = ["/dashboard", "/doctors", "/department", "/appointments"];

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("refresh")?.value;
  const { pathname } = request.nextUrl;

  if (token && (pathname === "/" || pathname.startsWith("/login")))
    return NextResponse.redirect(new URL("/dashboard", request.url));

  if (!token && PROTECTED.some((r) => pathname.startsWith(r)))
    return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
