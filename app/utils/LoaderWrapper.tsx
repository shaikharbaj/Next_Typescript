"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";

const authenticatedRoutes = ["/dashboard/home", "/profile"];
type UserType = {
    email: string
}
export default function Protected({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserType | null>();
    const { userinfo } = useSelector((state: { auth: any }) => state.auth);
    const pathname = usePathname();
    const { push } = useRouter();

    useEffect(() => {
        if (!userinfo && authenticatedRoutes.includes(pathname)) push("/login");

        if (userinfo) setUser(userinfo);
    }, [userinfo]);

    if (!user?.email) return <Loader />;

    return <>{children}</>;
}

