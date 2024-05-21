import React from 'react'
import Cookies from 'js-cookie'
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface IAdminMiddlewareProps {
    children: React.ReactNode
}
interface DecodedToken extends JwtPayload {
    userId: number;
    email: string;
    name: string;
    userType: string;
    roles?: string[];
    permissions?: string[]
}
const AdminMiddleware = ({ children }: { children: React.ReactNode }) => {
    const token = Cookies.get('token');
    let decodedT;
    let userRole: DecodedToken["roles"] | undefined;
    if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        decodedT = decodedToken;
        userRole = decodedToken.roles;
    }

    const isAdmin = userRole?.includes("ADMIN");
    const isModerator = userRole?.includes("SUBADMIN");
    const isUser = userRole?.includes("USER");
    let isCustomer;
    let isSupplier;
    if (isUser) {
        if (decodedT?.userType === "CUSTOMER") {
            isCustomer = true;
            isSupplier = false;
        } else {
            isSupplier = true;
            isCustomer = false;
        }
    }
    if(isAdmin){
          return children;
    }


    return children;
}

export default AdminMiddleware;