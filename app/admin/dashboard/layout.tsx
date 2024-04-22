import React from "react"
import DashboardLayoutWrapper from "../layout/Dashboard/DashboardLayoutWrapper";
interface IDashBoardProp {
    children: React.ReactNode
}
const DashboardLayout: React.FunctionComponent<IDashBoardProp> = ({ children }) => {
    return (
        <>
            <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
        </>
    )
}
export default DashboardLayout;