"use client"
import React, { useEffect, useState } from 'react'
import styles from '../auth.module.css'

import Link from 'next/link'

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
                {/* {error?.email && <span className="error">{error.email}</span>} */}

                <label htmlFor="cpassword">Confirm Password<span className={styles.required}>*</span></label>
                <input type="password" placeholder="confirmed Password" id="cpassword" name="confirmpassword"
                    value={value.confirmpassword}
                    onChange={InputchangeHandler} />
                {/* {error?.password && <span className="error">{error.password}</span>} */}

                <button className={styles.sbt_btn}>Reset</button>
            </form>
        </>

    )
}

export default ResetPassword