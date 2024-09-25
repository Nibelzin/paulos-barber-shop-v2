import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if (!token.isAdmin) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  if (req.nextUrl.pathname.startsWith("/bookings")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/bookings"],
}
