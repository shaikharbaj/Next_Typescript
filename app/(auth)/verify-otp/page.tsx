"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import './otp.css'
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import { useRouter } from 'next/navigation';
import { clearState, setOtp, verifyOtpAsync } from '@/app/Redux/features/auth/authSlice';
import { errortoast, successtoast } from '@/app/utils/alerts/alerts';
const VerifyOtp = () => {
    const { loading, success, email, error } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const {push} = useRouter();
    const [otpvalue, setotpvalue] = useState({
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: ""
    })

    const InputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setotpvalue((prev) => {
            return { ...prev,[e.target.name]:e.target.value}
        })
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
            push("/reset-password");
            dispatch(clearState());
        }
    }, [error, success]);

    useEffect(() => {
        if (!email) {
            push("/forgot-password")
        }
    }, [email])
    if (!email) {
        return null;
    }
    const submitHandler=(e:React.FormEvent<HTMLFormElement>)=>{
           e.preventDefault();
           const OTP=Number(Object.values(otpvalue).join(""))

           const payload = {email:email,otp:OTP};
           dispatch(setOtp(OTP));

           dispatch(verifyOtpAsync(payload))
           
    }
    return (
        <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <section className="wrapper">
                <div className="container">
                    <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 text-center">
                        {/* <div className="logo">
                            <img decoding="async" src="images/logo.png" className="img-fluid" alt="logo"/>
                        </div> */}
                        <form className="rounded bg-white shadow p-5" onSubmit={submitHandler}>
                            <h3 className="text-dark fw-bolder fs-4 mb-2">Verify OTP</h3>

                            <div className="fw-normal text-muted mb-4">
                                Enter the verification code we sent to
                            </div>

                            <div className="d-flex align-items-center justify-content-center fw-bold mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-asterisk" viewBox="0 0 16 16">
                                    <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-asterisk" viewBox="0 0 16 16">
                                    <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-asterisk" viewBox="0 0 16 16">
                                    <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-asterisk" viewBox="0 0 16 16">
                                    <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-asterisk" viewBox="0 0 16 16">
                                    <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-asterisk" viewBox="0 0 16 16">
                                    <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
                                </svg>
                                <span>8459</span>
                            </div>

                            <div className="otp_input text-start mb-2">
                                <label htmlFor="digit">Type your 6 digit security code</label>
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <input type="text" className="form-control" placeholder="" name="first" value={otpvalue.first} onChange={InputChangeHandler} />
                                    <input type="text" className="form-control" placeholder="" name="second" value={otpvalue.second} onChange={InputChangeHandler} />
                                    <input type="text" className="form-control" placeholder="" name="third" value={otpvalue.third} onChange={InputChangeHandler} />
                                    <input type="text" className="form-control" placeholder="" name="fourth" value={otpvalue.fourth} onChange={InputChangeHandler} />
                                    <input type="text" className="form-control" placeholder="" name="fifth" value={otpvalue.fifth} onChange={InputChangeHandler} />
                                    <input type="text" className="form-control" placeholder="" name="sixth" value={otpvalue.sixth} onChange={InputChangeHandler} />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary submit_btn my-4">Submit</button>

                            <div className="fw-normal text-muted mb-2">
                                Didn’t get the code ? <a href="#" className="text-primary fw-bold text-decoration-none">Resend</a>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default VerifyOtp