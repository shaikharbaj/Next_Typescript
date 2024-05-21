"use client";
import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
import { GuestWrapper } from "@/app/utils/Wrapper/GuestWrapper";
import AdminMiddleware from "@/app/utils/middleware/AdminMiddleware";

interface IDashboardLayoutWrapperProps {
    children: React.ReactNode;
}

const DashboardLayoutWrapper: React.FunctionComponent<
    IDashboardLayoutWrapperProps
> = ({ children }) => {
    const [toggleSidebar, setToggleSidebar] = React.useState(false);
    return (
        <>
            <GuestWrapper>
                <div className={`relative min-h-screen pt-16 transition-all duration-500 ease-in-out ${toggleSidebar ? "md:pl-0" : "md:pl-72"}`}>
                    <Header />
                    <Sidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
                    <div style={{ minHeight: "calc(100vh - 155px)" }}>
                        {children}
                    </div>
                    <Footer />
                </div>
            </GuestWrapper>
        </>
    );
};

export default DashboardLayoutWrapper;
