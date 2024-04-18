"use client"
import React, { useEffect, FC } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/app/Hook/hooks';
import Loading from '@/app/components/Loading/Loading';
import Loader from '@/app/components/Loader/Loader';
type Props = {
    // Define the properties that your components may receive.
    [key: string]: any;
};

type ComponentType = FC<Props>; // Define the type of the component

const AdminRoute = (WrappedComponent: ComponentType): FC<Props> => {
    return (props: Props) => {
        const router = useRouter();

        const { token, userinfo } = useAppSelector((state => state.auth));
        const isAdmin = userinfo?.role === "ADMIN"
        useEffect(() => {
            if (!token) {
                // Redirect to the login page if no user or no token
                router.push('/login');
            } else if (!isAdmin) {
                // Redirect to the home page if the user is not an admin
                router.push('/dashboard/home');
            }
        }, [token, userinfo]);
        // Render the component if the user is an admin
        return isAdmin ? <WrappedComponent {...props} /> : <Loader />;
    };
};

export default AdminRoute;
