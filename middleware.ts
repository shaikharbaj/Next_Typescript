
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";
interface Role {
  id: number;
  name: string;
  role: any;
  createdAt: string;
  updatedAt: string;
}
interface DecodedToken extends JwtPayload {
  userId: number;
  email: string;
  name: string;
  userType: string;
  roles?: string[];
  permissions?: string[]
}
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  let decodedT;
  let userRole: DecodedToken["roles"] | undefined;
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    decodedT = decodedToken;
    userRole = decodedToken.roles;
  }

  // const path = request.nextUrl.pathname;
  // const isAdmin = userRole?.some((role) => role.role.name === "ADMIN");
  // const isModerator = userRole?.some((role) => role.role.name === "MODERATOR");
  // const isUser = userRole?.some((role) => role.role.name === "USER");
  const path = request.nextUrl.pathname;
  const isAdmin = userRole?.includes("ADMIN");
  const isModerator = userRole?.includes("SUBADMIN");
  const isUser = userRole?.includes("USER");
  let isCustomer;
  let isSupplier;
  if (isUser) {
    if (decodedT?.userType === "CUSTOMER") {
      isCustomer = true;
      isSupplier = false;
    } else {
      isSupplier = true;
      isCustomer = false;
    }
  }

  const userProtectedRoutes=[
    "/about",
    "/profile"
  ]

  if (path.startsWith("/admin")) {
    if (token && path === "/admin/login") {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.nextUrl.origin)
      );
    }
    if (!token) {
    }
    if (token && !(isAdmin || isModerator)) {
      return NextResponse.redirect(
        new URL("/dashboard/home", request.nextUrl.origin)
      );
    }
    if (path === "/admin" && (isAdmin || isModerator)) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.nextUrl.origin)
      );
    }
  }

  //for supplier roots...................................
  if (path.startsWith("/supplier")) {
    if (token && path === "/supplier/login") {
      return NextResponse.redirect(
        new URL("/supplier/dashboard", request.nextUrl.origin)
      );
    }
    if (!token) {
    }
    if (token && !(isSupplier)) {
      return NextResponse.redirect(
        new URL("/dashboard/home", request.nextUrl.origin)
      );
    }
    if (path === "/supplier" && (isSupplier)) {
      return NextResponse.redirect(
        new URL("/supplier/dashboard", request.nextUrl.origin)
      );
    }
  }

  if (path === "/" || path === "/dashboard") {
    return NextResponse.redirect(
      new URL("/dashboard/home", request.nextUrl.origin)
    );
  }
  if (path === "/dashboard/home" && (isAdmin || isModerator) && token) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.nextUrl.origin)
    );
  }
  if(path === "/dashboard/home" && (isSupplier) && token){
    return NextResponse.redirect(
      new URL("/supplier/dashboard", request.nextUrl.origin)
    );
  }
  if ((path === "/login" || path === "/register") && token) {
    if (isAdmin || isModerator) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.nextUrl.origin)
      );
    } else {
      return NextResponse.redirect(
        new URL("/dashboard/home", request.nextUrl.origin)
      );
    }
  }

  // if ((path === "/about" || path === "/profile") && !isCustomer && token) {
  //   return NextResponse.redirect(
  //     new URL("/admin/dashboard", request.nextUrl.origin)
  //   );
  // }

  if ((path === "/about" || path === "/profile") &&(isAdmin||isSupplier||isModerator) ) {
    return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl.origin));
  }
}
