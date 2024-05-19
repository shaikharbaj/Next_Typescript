import React from 'react'
import DashBoardLayoutWrapper from '../layout/Dashboard/DashBoardLayoutWrapper'
interface ISupplierDashboardProps{
       children :React.ReactNode       
}
const SupplierDashboardLayout:React.FC<ISupplierDashboardProps> = ({children}) => {
  return (
          <>
             <DashBoardLayoutWrapper>{children}</DashBoardLayoutWrapper>
          </>
  )
}

export default SupplierDashboardLayout