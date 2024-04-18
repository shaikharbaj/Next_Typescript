"use client"
import React, { FC } from 'react';
import './sidebar.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Sidebar: FC = () => {
    const currentPath = usePathname();
    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-nav">
                    <div className="sidenav">
                        <div className="sidebar-item">
                            <div className={`sidebar-item-content ${currentPath==="/admin/dashboard"?"active":""}`}>
                                <i className="fa fa-th-large sidebar-icon sidebar-icon-lg"></i>
                                <span><Link href={"/admin/dashboard"}>Dashboard</Link></span>
                            </div>
                        </div>
                        <div className="sidebar-item">
                            <div className={`sidebar-item-content ${currentPath==="/admin/users"?"active":""}`}>
                                <i className="fa fa-th-large sidebar-icon sidebar-icon-lg"></i>
                                <span><Link href={"/admin/users"}>Users</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
