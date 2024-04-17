"use client"
import React, { useEffect, useState } from 'react'
import styles from '../auth.module.css'

import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import { useRouter } from 'next/navigation'
import { clearState, clearemail_otp, resetpasswordAsync } from '@/app/Redux/features/auth/authSlice'
import { errortoast, successtoast } from '@/app/utils/alerts/alerts'

interface Authstate {
    loading: boolean,
    error: any,
    success: boolean

}
type FormValues = {
    confirmpassword: string,
    password: string
}

function ResetPassword() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { loading, error, success, email, otp } = useAppSelector(state => state.auth);
    const [value, setValue] = useState<FormValues>({ confirmpassword: "", password: "" });
    const InputchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload: FormValues = {
            confirmpassword: value.confirmpassword,
            password: value.password
        }

    }

    useEffect(() => {
        if (error) {
            if (typeof (error) === 'string') {
                errortoast(error);
                dispatch(clearState())
            }
        } else if (success) {
            successtoast(success)
            router.push("/login");
            dispatch(clearState());
            setTimeout(() => {
                dispatch(clearemail_otp());
            }, 200)
        }
    }, [error, success]);
    useEffect(() => {
        if (!email || !otp) {
            router.push("/forgot-password");
        }
    }, [email])
    if (!email) {
        return null;
    }
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const OTP = Number(otp);
        const payload = { email: email, otp: OTP, password: value.password, confirmpassword: value.confirmpassword };
        dispatch(resetpasswordAsync(payload))

    }
    return (
        <>
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form className={styles.form} onSubmit={submitHandler}>
                <h3>Reset Password</h3>
                <label htmlFor="password"> Password <span className={styles.required}>*</span></label>
                <input type="password" placeholder="password" id="password" name="password"
                    value={value.password}
                    onChange={InputchangeHandler} />
                {/* {error?.email && <span className="error">{error.email}</span>} */}

                <label htmlFor="cpassword">Confirm Password<span className={styles.required}>*</span></label>
                <input type="password" placeholder="confirmed Password" id="cpassword" name="confirmpassword"
                    value={value.confirmpassword}
                    onChange={InputchangeHandler} />
                {/* {error?.password && <span className="error">{error.password}</span>} */}

                <button type='submit' className={styles.sbt_btn}>Reset</button>
            </form>
        </>

    )
}

export default ResetPassword