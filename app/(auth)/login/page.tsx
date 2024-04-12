"use client"
import React, { useEffect, useState } from 'react'
import styles from '../auth.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { clearState, loginUserAsync } from '@/app/Redux/features/auth/authSlice'
import { useAppDispatch } from '@/app/Hook/hooks'
import { useRouter } from 'next/navigation'
import { errortoast, successtoast } from '@/app/utils/alerts/alerts'
interface Authstate {
    loading: boolean,
    error: any,
    success: boolean

}
type FormValues = {
    email: string,
    password: string
}

function Login() {
    const { loading, success, error } = useSelector((state: { auth: Authstate }) => state.auth);
    const dispatch = useAppDispatch();
    const {push} = useRouter();
    // const dispatch = useDispatch();
    const [value, setValue] = useState<FormValues>({ email: "", password: "" });
    const InputchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload: FormValues = {
            email: value.email,
            password: value.password
        }
        dispatch(loginUserAsync(payload))
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
            successtoast('user logged in successfully')
            push("/dashboard/home");
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
                <h3>Login Here</h3>
                <label htmlFor="email">Email<span className={styles.required}>*</span></label>
                <input type="email" placeholder="Email" id="email" name="email"
                    value={value.email}
                    onChange={InputchangeHandler} />
                {error?.email && <span className="error">{error.email}</span>}

                <label htmlFor="password">Password<span className={styles.required}>*</span></label>
                <input type="password" placeholder="Password" id="password" name="password"
                    value={value.password}
                    onChange={InputchangeHandler} />
                {error?.password && <span className="error">{error.password}</span>}

                <button disabled={loading}>Log In</button>
                <div className={styles.alreadyhave}>
                    <p>Not have an  account? <Link href={"/register"}>Register</Link></p>
                </div>
            </form>
        </>

    )
}

export default Login