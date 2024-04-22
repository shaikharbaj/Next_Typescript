"use client"
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { loadRolesAsyncThunk } from "@/app/Redux/features/role/roleSlice";
import { RootState } from "@/app/Redux/store";
import React, { useEffect, useState } from "react";

export function GuestWrapper({ children }: { children: React.ReactNode }) {
    const { roles } = useAppSelector((state: RootState) => state.role);
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (roles) {
            setLoading(false)
        }
        dispatch(loadRolesAsyncThunk());
    }, [roles]);

    return loading ? <><h1>Loading</h1></> : children;
}