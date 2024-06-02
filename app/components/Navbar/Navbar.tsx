"use client";
// import { logout } from "@/app/Redux/features/auth/authSlice";
import "./navbar.css";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { successtoast } from "@/app/utils/alerts/alerts";
import Helper from "@/app/utils/helper";
import { logout } from "@/app/Redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { FaShoppingCart } from "react-icons/fa";
import {
  loadcartAsync,
  loadcartcount,
} from "@/app/Redux/features/cart/cartSlice";
import { RootState } from "@/app/Redux/store";

type Authstate = {
  loading: boolean;
  success: boolean;
  error: any;
  userinfo: any;
};
const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const path = usePathname();
  const [token, setToken] = useState<string | undefined | null>();
  const [cartcount, setCartCount] = useState(0);
  const { userinfo } = useSelector((state: { auth: Authstate }) => state.auth);
  const { cartItem } = useAppSelector((state: RootState) => state.cart);

  const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(logout());
    successtoast("user logged out succesfully");
    // router.replace("/login");
    if (typeof window !== "undefined") {
      window.location.href = "/login"; // This will trigger a full page reload
    }
  };

  const gotocartHandler = () => {
    console.log("called");
    router.push("/cart");
  };

  useEffect(() => {
    dispatch(loadcartAsync());
  }, []);

  useEffect(() => {
    const token = Helper.getLocalToken();
    setToken(token);
  }, [userinfo]);

  useEffect(() => {
    const count = cartItem?.reduce((acc: number, curr: any) => {
      acc += Number(curr["quantity"]);
      return acc;
    }, 0);
    setCartCount(count);
  }, [cartItem]);

  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/dashboard/home">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i
            className="bx bx-menu"
            style={{ fontSize: "30px", color: "white" }}
          ></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {token && userinfo?.roles?.includes("USER") ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href="/"
                  >
                    <span className="welcome">{`Welcome ${
                      userinfo?.name?.length > 7
                        ? userinfo?.name?.split("").slice(0, 8).join("") + "..."
                        : userinfo?.name
                    }`}</span>
                  </Link>
                </li>
                {/* <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/admin/dashboard">
                                        Admin Dashboard
                                    </Link>
                                </li> */}
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href="/"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/blog">
                    Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/product">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/orders">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link cart" href={"/cart"}>
                    <FaShoppingCart className="cartIcon" />
                    <span className="cart_count">
                      {cartcount ? cartcount : 0}
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href={"#"} onClick={logoutHandler}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/blog">
                    Blogs
                  </Link>
                </li>
              </>
            )}

            {/* */}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
