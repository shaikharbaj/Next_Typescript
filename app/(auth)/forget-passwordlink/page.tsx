"use client"
import React, { useEffect, useState } from 'react'
import styles from '../auth.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearState, forgotpasswordwithlink, loginUserAsync } from '@/app/Redux/features/auth/authSlice'
import { useRouter } from 'next/navigation'
import { errortoast, successtoast } from '@/app/utils/alerts/alerts'
import { useAppDispatch } from '@/app/Hook/hooks'
interface Authstate {
    loading: boolean,
    error: any,
    success: string | null

}
type FormValues = {
    email: string
}

function ForgotPasswordLink() {
    const { loading, success, error } = useSelector((state: { auth: Authstate }) => state.auth);
    console.log(loading, success, error)
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

        dispatch(forgotpasswordwithlink(payload))
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
            push("/login");
            dispatch(clearState());
        }
    }, [error, success]);
    return (

        <>
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form className={styles.form} onSubmit={SubmitHandler} style={{ minHeight: "300px" }}>
                <h3>Forgot Password</h3>
                <label htmlFor="email">Email<span className={styles.required}>*</span></label>
                <input type="email" placeholder="Email" id="email" name="email"
                    value={value.email}
                    onChange={InputchangeHandler} />
                {error?.email && <span className="error">{error.email}</span>}
                <button className={styles.sbt_btn} disabled={loading}>{loading?"send link to email":"Send Forgot Password Link"}</button>
                {/* <div className={styles.alreadyhave}>
                    <p>Not have an  account? <Link href={"/register"}>Register</Link></p>
                    <p><Link href={"/forgot-password"}>forgot password?</Link></p>
                </div> */}
            </form>
        </>

    )
}

export default ForgotPasswordLink