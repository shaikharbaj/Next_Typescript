"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.module.css'
import { useAppDispatch } from '@/app/Hook/hooks'
import { clearState, loadUserAsync, updateuserProfileAsync } from '@/app/Redux/features/auth/authSlice'
import { errortoast, successtoast } from '@/app/utils/alerts/alerts'

type AuthState = {
    error: any,
    loading: boolean,
    success: boolean,
    userinfo: any
}
const page = () => {
    const { userinfo, error, loading, success } = useSelector((state: { auth: AuthState }) => state.auth);
    console.log(userinfo)
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone] = useState('');
    const [date_of_birth, setDob] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [imgcompressloading, setimgcompressloading] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState<File | null>(null);
    // const [error, setError] = useState(null);
    const currentDate = new Date().toISOString().split('T')[0];

    const HandleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setimgcompressloading(true);
        if (event?.target?.files) {
            const imageFile = event.target.files[0];
            if ((imageFile.size * 1024 * 1024) > (1 * 1024 * 1024)) {
                try {
                    const compressedFile = await imageCompression(imageFile, {
                        maxSizeMB: 1
                    });
                    setAvatar(compressedFile);
                    return;
                } catch (error) {
                    console.log(error);
                } finally {
                    setimgcompressloading(false);
                }
            }
            setAvatar(imageFile);
        }

    }


    useEffect(() => {
        if (userinfo) {
            // Update state variables when userinfo changes
            setName(userinfo?.name || '');
            setEmail(userinfo?.email || '');
            setPhone(userinfo?.user_information?.phone_number || '');
            if (userinfo?.user_information?.data_of_birth) {
                const dateParts = userinfo?.user_information?.data_of_birth.split('T');
                const dateOfBirth = dateParts[0];
                setDob(dateOfBirth || '');
            }
            setStreet(userinfo?.user_information?.street || '');
            setCity(userinfo?.user_information?.city || '');
            setState(userinfo?.user_information?.state || '');
            setZipcode(userinfo?.user_information?.zipcode || '');
        }
    }, [userinfo]);

    useEffect(() => {
        dispatch(loadUserAsync())
        return () => {
            dispatch(clearState());
        }
    }, []);

    useEffect(() => {
        if (error) {

            if (typeof (error) === "string") {
                errortoast(error);
                dispatch(clearState());
            }
        }
        if (success) {
            successtoast('user profile updated successfully');
            setAvatar(null)
            dispatch(clearState());
        }

    }, [error, success])

    const submitHandler = async () => {
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        if (avatar) {
            formdata.append('file', avatar);
        }
        if (date_of_birth) {
            formdata.append("data_of_birth", date_of_birth);
        }
        if (phone_number) {
            formdata.append('phone_number', phone_number);
        }
        if (street) {
            formdata.append('street', street);
        }
        if (city) {
            formdata.append('city', city);
        }
        if (state) {
            formdata.append('state', state);
        }
        if (zipcode) {
            formdata.append('zipcode', zipcode);
        }
        dispatch(updateuserProfileAsync(formdata))
    }
    return (
        <>
            <div className="container mt-3">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar mb-2">
                                            <img src={userinfo?.avatar ? userinfo.avatar : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"} className={`${styles.main_img} img-fluid`} alt="image" />
                                            <input type="file" accept="image/*" className={styles.input} id="profile" onChange={HandleFileChange} />
                                            <div className={styles.change_profile}>
                                                <label htmlFor="profile" className={styles.label}>Choose File<i className='bx bxs-camera camera_icon ms-2'></i></label>
                                                {avatar && <img src={URL.createObjectURL(avatar)} alt="img" className={styles.preview} />}
                                            </div>
                                        </div>
                                        <h5 className="user-name mb-2">{userinfo?.name}</h5>
                                        <h6 className="user-email mb-1">{userinfo?.email}</h6>
                                    </div>
                                    {/* <div className="about">
                                        <h5>About</h5>
                                        <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-2 text-primary">Personal Details</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Full Name</label>
                                            <input type="text" className="form-control" id="fullName" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
                                            {error?.name && <span className="error">{error.name}</span>}

                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="eMail">Email</label>
                                            <input type="email" className="form-control" id="eMail" placeholder="Enter email ID" value={email}
                                                onChange={(e) => setEmail(e.target.value)} disabled={true} />
                                            {error?.email && <span className="error">{error.email}</span>}

                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input type="number" className="form-control" id="phone" placeholder="Enter phone number" value={phone_number}
                                                onChange={(e) => setPhone(e.target.value)} />
                                            {error?.phone_number && <span className="error">{error.phone_number}</span>}

                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="website">DOB</label>
                                            <input type="date" className="form-control" id="website" placeholder="date of birth" onChange={(e) => setDob(e.target.value)} value={date_of_birth} max={currentDate} />
                                            {error?.date && <span className="error">{error.date}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mt-3 mb-2 text-primary">Address</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="Street">Street</label>
                                            <input type="name" className="form-control" id="Street" placeholder="Enter Street" value={street} onChange={(e) => setStreet(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="ciTy">City</label>
                                            <input type="name" className="form-control" id="ciTy" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="sTate">State</label>
                                            <input type="text" className="form-control" id="sTate" placeholder="Enter State" value={state} onChange={(e) => setState(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="zIp">Zip Code</label>
                                            <input type="number" className="form-control" id="zIp" placeholder="Zip Code" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                                            {error?.zipcode && <span className="error">{error.zipcode}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters mt-2">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <button type="button" id="submit" name="submit" className="btn btn-primary w-100" onClick={submitHandler} disabled={loading || imgcompressloading}>{loading ? "Data is Updating" : (imgcompressloading ? "Image is Compressing" : "Update")}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page