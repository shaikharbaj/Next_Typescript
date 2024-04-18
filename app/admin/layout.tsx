import Navbar from "@/app/components/Navbar/Navbar"
import AdminNavbar from "./Components/AdminNavbar/AdminNavbar"
import Sidebar from "./Components/Sidebar/sidebar"

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (

        <>
            <div className="main_wrapper">
                <AdminNavbar />
                <div>
                    <Sidebar />
                    <div style={{ width: "79%", marginLeft: "auto", paddingLeft: "10px", paddingTop: "5px" }}>
                        {children}
                    </div>
s
                </div>
            </div>
        </>
    )
}