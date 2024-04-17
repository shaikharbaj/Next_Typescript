import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  const publicRoutes = path === "/login" || path === "/register" || path ==="/forgot-password"||path==="/verify-otp"||path==="/reset-password";
  const homeRoute = path === "/";
  const protectedRoute = path === "/dashboard/home";
  if (publicRoutes && token !== undefined) {
    console.log("Hello")
    return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl.origin));
  }
  if(path==="/profile" && !token){
      return NextResponse.redirect(new URL("/login",request.nextUrl.origin));
  }
  // if (!token && protectedRoute) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  // }
  if (homeRoute) {
    return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl.origin));
  }

  if (path === "/about" && !token) {

    return NextResponse.redirect(new URL("/login", request.nextUrl.origin))
  }
}
export const config = {
  matcher: ["/dashboard/home", "/login", "/register", "/", "/about","/profile","/forgot-password","/verify-otp","/reset-password"],
};
