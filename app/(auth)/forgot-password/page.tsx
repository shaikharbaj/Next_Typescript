"use client"
import React, { useEffect, useState } from 'react'
import styles from '../auth.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { clearState, forgotpasswordAsync, loginUserAsync, setEmail } from '@/app/Redux/features/auth/authSlice'
import { useAppDispatch } from '@/app/Hook/hooks'
import { useRouter } from 'next/navigation'
import { errortoast, successtoast } from '@/app/utils/alerts/alerts'
interface Authstate {
    loading: boolean,
    error: any,
    success: any,
    email:string|null

}
type FormValues = {
    email: string
}

function ForgotPassword() {
    const { loading, success, error,email } = useSelector((state: { auth: Authstate }) => state.auth);
    const dispatch = useAppDispatch();
    const { push } = useRouter();
    // const dispatch = useDispatch();
    const [value, setValue] = useState<FormValues>({ email: "" });
    const InputchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload: FormValues = {
            email: value.email
        }
        dispatch(setEmail(payload))
        dispatch(forgotpasswordAsync(payload))
    }

    useEffect(() => {
        if (error) {
            if (typeof (error) === 'string') {
                errortoast(error);
                dispatch(clearState())
            }
        }
        if (success) {
            successtoast(success)
            push("/verify-otp");
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
                <h3>Forgot Password</h3>
                <label htmlFor="email">Email<span className={styles.required}>*</span></label>
                <input type="email" placeholder="Email" id="email" name="email"
                    value={value.email}
                    onChange={InputchangeHandler} />
                {error?.email && <span className="error">{error.email}</span>}

                <button className={styles.sbt_btn} disabled={loading}>Send OTP</button>
                {/* <div className={styles.alreadyhave}>
                    <p>Not have an  account? <Link href={"/register"}>Register</Link></p>
                    <p><Link href={"/forgot-password"}>forgot password?</Link></p>
                </div> */}
            </form>
        </>

    )
}

export default ForgotPassword