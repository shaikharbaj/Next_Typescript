"use client"
import React, { useEffect, useState } from 'react'
import styles from '../../../auth.module.css'

import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import { clearState, resetpasswordwithlinkAsync } from '@/app/Redux/features/auth/authSlice'
import { useSelector } from 'react-redux'
import { errortoast, successtoast } from '@/app/utils/alerts/alerts'
import { useRouter } from 'next/navigation'

interface Authstate {
    loading: boolean,
    error: any,
    success: boolean

}
type FormValues = {
    confirmpassword: string,
    password: string
}
type payloadValue = {
    password: string,
    confirmpassword: string,
    token: string, id: number
}

function ResetPassword({ params }: { params: { id: string, token: string } }) {
    const dispatch = useAppDispatch();
    const { push, replace } = useRouter();
    const { loading, error, success } = useAppSelector((state) => state.auth);
    const [value, setValue] = useState<FormValues>({ confirmpassword: "", password: "" });
    const { id, token } = params;

    const InputchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload: payloadValue = {
            confirmpassword: value.confirmpassword,
            password: value.password,
            token: token,
            id: Number(id)
        }

        dispatch(resetpasswordwithlinkAsync(payload))
    }

    useEffect(() => {
        return () => {
            dispatch(clearState());
        }
    }, [])

    useEffect(() => {
        if (error) {
            if (typeof (error) === 'string') {
                errortoast(error);
                dispatch(clearState())
            }
        }
        if (success) {
            successtoast(success)
            replace("/login");
            dispatch(clearState());
        }
    }, [error, success]);
    return (
        <>
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form className={styles.form} onSubmit={SubmitHandler}>
                <h3>Reset Password</h3>
                <label htmlFor="password"> Password <span className={styles.required}>*</span></label>
                <input type="password" placeholder="password" id="password" name="password"
                    value={value.password}
                    onChange={InputchangeHandler} />
                {error?.password && <span className="error">{error.password}</span>}

                <label htmlFor="cpassword">Confirm Password<span className={styles.required}>*</span></label>
                <input type="password" placeholder="confirmed Password" id="cpassword" name="confirmpassword"
                    value={value.confirmpassword}
                    onChange={InputchangeHandler} />
                {error?.confirmpassword && <span className="error">{error.confirmpassword}</span>}

                <button className={styles.sbt_btn} disabled={loading}>{loading?"loading...":"Reset Password"}</button>
            </form>
        </>
    )
}

export default ResetPassword;