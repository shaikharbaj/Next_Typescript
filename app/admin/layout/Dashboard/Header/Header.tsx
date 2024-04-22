/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { RootState } from "@/app/Redux/store";
import styles from './style.module.css'

interface IHeaderProps { }

const Header: React.FunctionComponent<IHeaderProps> = ({ }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // //Function to handel logout
    // const handelLogout = () => {
    //     Cookies.remove("token");
    //     router.replace("/login");
    // };

    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                <li className={styles.li}>
                    <Link href="/dashboard/profile">
                        <div className={styles.profile_wrapper}>
                            <div className="flex items-center">
                                <div className="flex flex-col pr-3 text-right">
                                    <p className="mb-0">Hello ARBAJ</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex flex-col pr-3 text-right">
                                <p className="mb-0">Hello ARBAJ</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex flex-col pr-3 text-right">
                                <p className="mb-0">Hello ARBAJ</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;
