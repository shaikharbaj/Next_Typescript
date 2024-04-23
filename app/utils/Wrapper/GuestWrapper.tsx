"use client"
import Loading from "@/app/components/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { loadRolesAsyncThunk } from "@/app/Redux/features/role/roleSlice";
import { RootState } from "@/app/Redux/store";
import React, { useEffect, useState } from "react";

export function GuestWrapper({ children }: { children: React.ReactNode }) {
    const { roles } = useAppSelector((state: RootState) => state.role);
    const { userinfo } = useAppSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (userinfo) {
            setLoading(false)
        }else{
            dispatch(loadRolesAsyncThunk());
        }
    }, [userinfo]);

    return loading ? <><Loading /></> : children;
}