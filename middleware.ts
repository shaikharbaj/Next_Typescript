import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  let userRole;
  if (token) {
    let user = jwtDecode<JwtPayload>(token);
    userRole = user?.role
  }
  const path = request.nextUrl.pathname;

  const publicRoutes = path === "/login" || path === "/register" || path === "/forgot-password" || path === "/verify-otp" || path === "/reset-password";

  const clientRoute = ["/dashboard/home", "/about", "/profile"]
  const homeRoute = path === "/";
  if(clientRoute.includes(path) && userRole==="ADMIN"){
       return NextResponse.redirect(new URL("/admin/dashboard", request.nextUrl.origin));
  }
  if (path.startsWith("/admin") && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl.origin));
  }

  if (publicRoutes && token !== undefined) {
    return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl.origin));
  }
  if (path === "/profile" && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }
  if (homeRoute) {
    return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl.origin));
  }

  if (path === "/about" && !token) {

    return NextResponse.redirect(new URL("/login", request.nextUrl.origin))
  }
}
export const config = {
  matcher: ["/dashboard/home", "/login", "/register", "/", "/about", "/profile", "/forgot-password", "/verify-otp", "/reset-password", "/admin/dashboard","/users"],
};
