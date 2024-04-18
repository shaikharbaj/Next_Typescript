"use client"
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import './adminnavbar.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { logout } from '@/app/Redux/features/auth/authSlice';
import { successtoast } from '@/app/utils/alerts/alerts';
import Helper from '@/app/utils/helper';

type Authstate = {
    loading: boolean,
    success: boolean,
    error: any,
    userinfo: any
}
const AdminNavbar = () => {
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const [token, setToken] = useState<string | undefined | null>();
    const { userinfo } = useSelector((state: { auth: Authstate }) => state.auth);
    const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        dispatch(logout());
        push("/login");
        successtoast('admin logged out succesfully')
    };
    useEffect(() => {
        const token = Helper.getLocalToken();
        setToken(token)
    }, [userinfo])
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light custome_nav">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/dashboard/home">
                        ADMIN-DASHBOARD
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
                        <i className='bx bx-menu' style={{ fontSize: "30px", color: "white" }}></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            {
                                token && <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" href="/">
                                            <span className="welcome">{`Welcome ${userinfo?.name?.length > 7 ? (userinfo?.name?.split("").slice(0, 8).join("") + "...") : (userinfo?.name)}`}</span>
                                        </Link>


                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" href={"#"} onClick={logoutHandler}>
                                            Logout
                                        </Link>
                                    </li>

                                </>
                            }

                            {/* */}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AdminNavbar;