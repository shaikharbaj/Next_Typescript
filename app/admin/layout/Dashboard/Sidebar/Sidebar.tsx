"use client";
import React from "react";
import Link from "next/link";
import styles from "./style.module.css";
import "simplebar-react/dist/simplebar.min.css";
import { IoImageSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaList, FaUser } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import { TbCategory2 } from "react-icons/tb";
import SimpleBar from "simplebar-react";
interface ISidebarProps {
  toggleSidebar: boolean;
  setToggleSidebar: any;
}

const Sidebar: React.FunctionComponent<ISidebarProps> = ({
  toggleSidebar,
  setToggleSidebar,
}) => {
  const [manageCategories, setManageCategories] = React.useState(false);
  return (
    <div
      className={`${styles.sidebar_wrapper} ${
        toggleSidebar ? "left-72" : "left-0"
      }`}
    >
      <div className="h-auto">
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center">
              <Link href="/admin/dashboard" className={styles.sidebar_header}>
                DASHBOARD
              </Link>
            </div>

            <button
              className={`${styles.togglebtn} ${
                toggleSidebar ? "toggle" : "not_toggle"
              } `}
              onClick={() => setToggleSidebar(!toggleSidebar)}
            >
              <i className="bx bx-menu"></i>
            </button>
          </div>
        </div>
      </div>
      {/* Main Menu */}
      <SimpleBar forceVisible="y" autoHide={false} className="h-5/6">
        <div className="overflow-hidden">
          <div className="px-6">
            <hr className="border-gray-700" />
          </div>
          <div className="">
            <ul className="flex flex-col">
              {/* dashboard   */}
              <li className="mb-1">
                <Link
                  href="/admin/dashboard"
                  className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white flex rounded active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all no-underline"
                >
                  <IoMdHome
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-4 h-4 bi bi-braces-asterisk mr-3"
                  />
                  Dashboard
                </Link>
              </li>

              {/* user */}
              <li className="">
                <Link
                  href="/admin/dashboard/users"
                  className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white flex rounded active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all no-underline"
                >
                  <FaUser
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-4 h-4 bi bi-person mr-3"
                  />
                  Users
                </Link>
              </li>

              {/* banner    */}
              <li className="">
                <Link
                  href="/admin/dashboard/banner"
                  className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white flex rounded active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all no-underline"
                >
                  <IoImageSharp
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-4 h-4 bi bi-person mr-3"
                  />
                  Banner
                </Link>
              </li>
              <li
                className="relative"
              >
                <Link
                  href="#"
                  className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white flex rounded active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"
                >
                  <FaList
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-4 h-4 bi bi-braces-asterisk mr-3"
                    // viewBox="0 0 16 16"
                  />{" "}
                  Manage Categories
                </Link>
                <button
                  className={`absolute right-0 top-1.5 flex items-center text-white p-0.5 rounded bg-gray-800`}
                  onClick={() => setManageCategories(!manageCategories)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className={`w-5 h-5 bi bi-arrow-up-short duration-300 ease-in-out transition-all  ${
                      !manageCategories && "rotate-180"
                    }`}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                    />
                  </svg>
                </button>
                <div
                  className={`pt-2 pl-4 duration-300 ease-in-out transition-all"
                  ${manageCategories ? "visible" : "hidden"}`}
                >
                  <ul className="flex flex-col pl-2 text-gray-400 border-l border-gray-700 ">
                    {/* <li>
                      <Link
                        className="inline-block text-white w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white"
                        href="/dashboard/categories?page=1&take=10"
                      >
                        Categories
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        className="inline-block text-white w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white"
                        href="/admin/dashboard/attributes/units"
                      >
                        Attribute Units
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="inline-block text-white w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white"
                        href="/admin/dashboard/attributes"
                      >
                        Attributes
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="">
                <Link
                  href="/admin/dashboard/categories"
                  className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white flex rounded active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all no-underline"
                >
                  <TbCategoryPlus
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-4 h-4 bi bi-person mr-3"
                  />
                  Categories
                </Link>
              </li>
              <li className="">
                <Link
                  href="/admin/dashboard/categories/subcategories"
                  className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white flex rounded active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all no-underline"
                >
                  <TbCategory2
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-4 h-4 bi bi-person mr-3"
                  />
                  Subcategories
                </Link>
              </li>
              <li className="">
                <Link
                  href="/admin/dashboard/blog"
                  className="w-full px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white flex rounded active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all no-underline"
                >
                  <TbCategory2
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-4 h-4 bi bi-person mr-3"
                  />
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </SimpleBar>
      {/* User Profile */}
      {/* <div className="h-1/6">
        <div className=" absolute bottom-0 left-0 pl-6 pr-4 py-4 bg-gray-900 flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white">
              <img
                className="rounded-full"
                src="./img/userProfile.png"
                alt="User Profile"
              />
            </div>
            <div className="flex flex-col pl-3">
              <div className="text-sm text-gray-50">Vishnu Nimbalkar</div>
              <span className="text-xs text-[#acacb0] font-light tracking-tight">
                vnimbalkar@gmail.com
              </span>
            </div>
          </div>
          <button className="text-gray-400 bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white">
            <svg
              className="w-4 h-4 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.25 10.75L12 14.25L8.75 10.75"
              ></path>
            </svg>
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
