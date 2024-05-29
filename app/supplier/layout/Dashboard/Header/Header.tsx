/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { RootState } from "@/app/Redux/store";
import styles from "./style.module.css";
import { logout } from "@/app/Redux/features/auth/authSlice";
import { successtoast } from "@/app/utils/alerts/alerts";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = ({}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { userinfo } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  // //Function to handel logout
  const handelLogout = () => {
    dispatch(logout());
    successtoast("logged out successfully...!");
    if (typeof window !== "undefined") {
      window.location.href = "/supplier/login"; // This will trigger a full page reload
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest("#user-menu-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.li}>
          {/* <Link href="/dashboard/profile"> */}
          <div className={styles.profile_wrapper}>
            <div className="flex items-center">
              <div className="flex flex-col pr-3 text-right">
                <p className={`${styles.welcome}`}>{`Welcome ${
                  userinfo?.name
                    ? userinfo.name.length > 7
                      ? userinfo.name.split("").slice(0, 8).join("") + "..."
                      : userinfo.name
                    : "Guest"
                }`}</p>
              </div>
            </div>
          </div>
          {/* </Link> */}
        </li>
        <li>
          <div className="flex items-center" onClick={toggleMenu}>
            <div className="flex flex-col pr-3 text-right">
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        userinfo?.avatar
                          ? `${userinfo.avatar}`
                          : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      }
                      alt=""
                      onClick={toggleMenu}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {isOpen && (
            <div
              className="absolute right-1 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex={-1}
            >
              <Link
                href={"/admin/dashboard/profile"}
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-0"
              >
                Your Profile
              </Link>
              <button
                onClick={handelLogout}
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-2"
              >
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
