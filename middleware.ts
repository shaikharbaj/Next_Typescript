import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";
interface Role {
  id: number;
  name: string;
  role: any;
  createdAt: string;
  updatedAt: string;
}
// interface DecodedToken extends JwtPayload {
//   userId: number;
//   email: string;
//   name: string;
//   role?: Role[];
// }
interface DecodedToken extends JwtPayload {
  userId: number;
  email: string;
  name: string;
  roles?: string[];
  permissions?:string[]
}
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  let userRole: DecodedToken["roles"] | undefined;
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
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

  if ((path === "/about" || path === "/profile") && !isUser && token) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.nextUrl.origin)
    );
  }

  if ((path === "/about" || path === "/profile") && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  // if (!token && path.startsWith("/admin")) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  // }
  // if (path.startsWith("/dashboard") && (isAdmin || isModerator)) {
  //   return NextResponse.redirect(
  //     new URL("/admin/dashboard", request.nextUrl.origin)
  //   );
  // }

  // if(path.startsWith("/dashboard")){
  //   return NextResponse.redirect(
  //     new URL("/dashboard/home", request.nextUrl.origin)
  //   );
  // }

  // if (
  //   token &&
  //   (path === "/login" || path == "/register") &&
  //   (isAdmin || isModerator)
  // ) {
  //   return NextResponse.redirect(
  //     new URL("/admin/dashboard", request.nextUrl.origin)
  //   );
  // }

  // if (token && (path === "/login" || path == "/register") && isAdmin) {
  //   return NextResponse.redirect(
  //     new URL("/admin/dashboard", request.nextUrl.origin)
  //   );
  // }
  // const publicRoutes =
  //   path === "/login" ||
  //   path === "/register" ||
  //   path === "/forgot-password" ||
  //   path === "/verify-otp" ||
  //   path === "/reset-password";

  // const clientRoute = ["/dashboard/home", "/about", "/profile"];
  // const homeRoute = path === "/";
  // if (clientRoute.includes(path) && (isAdmin || isModerator)) {
  //   return NextResponse.redirect(
  //     new URL("/admin/dashboard", request.nextUrl.origin)
  //   );
  // }
  // if (path.startsWith("/admin") && (isAdmin || isModerator)) {
  //   return NextResponse.redirect(
  //     new URL("/dashboard/home", request.nextUrl.origin)
  //   );
  // }

  // if (publicRoutes && token !== undefined) {
  //   return NextResponse.redirect(
  //     new URL("/dashboard/home", request.nextUrl.origin)
  //   );
  // }
  // if (path === "/profile" && !token) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  // }
  // if (homeRoute) {
  //   return NextResponse.redirect(
  //     new URL("/dashboard/home", request.nextUrl.origin)
  //   );
  // }

  // if (path === "/about" && !token) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  // }
}
// export const config = {
//   matcher: [
//     "/dashboard",
//     "/dashboard/home",
//     "/login",
//     "/register",
//     "/",
//     "/about",
//     "/profile",
//     "/forgot-password",
//     "/verify-otp",
//     "/reset-password",
//     "/admin",
//     "/admin/dashboard",
//     "/users",
//     "/admin/login",
//   ],
// };
