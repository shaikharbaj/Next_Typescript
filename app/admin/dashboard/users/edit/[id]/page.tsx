"use client"
import { changeRoleAsync, loadProfileAsyncThunk } from '@/app/Redux/features/profile/profileSlice';
import { RootState } from '@/app/Redux/store';
import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './style.module.css'
import { loadRolesAsyncThunk } from "@/app/Redux/features/role/roleSlice";
import { errortoast, successtoast } from "@/app/utils/alerts/alerts";
import Loading from "@/app/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks';
interface IEditUserProp {
    params: any
}
const EditUser: React.FunctionComponent<IEditUserProp> = ({ params }) => {
    const id = params.id;
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { roles } = useAppSelector((state: RootState) => state.role);
    const { loading, profile } = useAppSelector((state: RootState) => state.profile);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone] = useState('');
    const [date_of_birth, setDob] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [selectedrole, setSelectedRole] = useState<string | undefined>(undefined);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState<{
        value: string;
        label: string;
    } | null>(null);


    useEffect(() => {
        dispatch(loadRolesAsyncThunk());
        dispatch(loadProfileAsyncThunk({ id: Number(id) }))
    }, [])

    useEffect(() => {
        if (profile && Object.values(profile).length > 0 && roles) {
            // Update state variables when userinfo changes
            setName(profile?.name || '');
            setEmail(profile?.email || '');
            setPhone(profile?.user_information?.phone_number || '');
            if (profile?.user_information?.data_of_birth) {
                const dateParts = profile?.user_information?.data_of_birth.split('T');
                const dateOfBirth = dateParts[0];
                setDob(dateOfBirth || '');
            }
            setStreet(profile?.user_information?.street || '');
            setCity(profile?.user_information?.city || '');
            setState(profile?.user_information?.state || '');
            setZipcode(profile?.user_information?.zipcode || '');
            setSelectedRole(profile?.role.id)
            // let roleOptions: any = roles.map((option: any) => {
            //     return { value: option.id.toString(), label: option.name }
            // });
            // setOptions(roleOptions);

            // // Set selectedOptions with the default role value
            // const defaultRole = profile.role ? { value: profile.role.id.toString(), label: profile.role.name } : null;
            // setSelectedOptions(defaultRole);
        }
    }, [profile, roles])

    const rolechangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(e.target.value);
        console.log(e.target.value);
    }
    const handleBackNavigation = () => {
        router.replace("/admin/dashboard/users")
    }
    const submitHandler = () => {
        const payload = {
            user_id: Number(id),
            role_id: Number(selectedrole)
        }
        dispatch(changeRoleAsync(payload)).unwrap().then((res) => {
            successtoast("user role updated successfully")
        }).catch((err) => {
            errortoast(err);
        })
    }
    if (loading) {
        return <Loading />
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
                                            <img src={profile?.avatar ? profile.avatar : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"} className={`${styles.main_img} img-fluid`} alt="image" />
                                            {/* <input type="file" accept="image/*" className={styles.input} id="profile" onChange={HandleFileChange} /> */}
                                            {/* <div className={styles.change_profile}>
                                                <label htmlFor="profile" className={styles.label}>Choose File<i className='bx bxs-camera camera_icon ms-2'></i></label>
                                                {avatar && <img src={URL.createObjectURL(avatar)} alt="img" className={styles.preview} />}
                                            </div> */}
                                        </div>
                                        <h5 className="user-name mb-2">{profile?.name}</h5>
                                        <h6 className="user-email mb-1">{profile?.email}</h6>
                                    </div>
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
                                            <input type="text" className="form-control" id="fullName" placeholder="Enter full name" value={name} disabled={true} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="eMail">Email</label>
                                            <input type="email" className="form-control" id="eMail" placeholder="Enter email ID" value={email}
                                                disabled={true} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="eMail">Role</label>
                                            <input type="email" className="form-control" id="eMail" placeholder="Enter email ID" value={profile?.role?.name}
                                                disabled={true} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input type="number" className="form-control" id="phone" placeholder="Enter phone number" value={phone_number}
                                                disabled={true} />

                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="website">DOB</label>
                                            <input type="date" className="form-control" id="website" placeholder="date of birth" disabled={true} />
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
                                            <input type="name" className="form-control" id="Street" placeholder="Enter Street" value={street} disabled={true} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="ciTy">City</label>
                                            <input type="name" className="form-control" id="ciTy" placeholder="Enter City" value={city} disabled={true} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="sTate">State</label>
                                            <input type="text" className="form-control" id="sTate" placeholder="Enter State" value={state} disabled={true} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="zIp">Zip Code</label>
                                            <input type="number" className="form-control" id="zIp" placeholder="Zip Code" value={zipcode} disabled={true} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mt-3 mb-2 text-primary">Assign Role.</h6>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <select id="" className="form-select" value={selectedrole} onChange={rolechangeHandler}>
                                                {
                                                    roles?.length > 0 && roles.map((role: any) => {
                                                        return (
                                                            <option value={`${role.id}`} key={role.id}>{role.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>


                                </div>
                                <div className="row gutters mt-3">
                                    <div className="col-12">
                                        <div className="text-right">
                                            <button type="button" id="submit" name="submit" className="btn btn-primary w-100" onClick={submitHandler}>UPDATE ROLE</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters mt-3">
                                    <div className="col-12">
                                        <div className="text-right">
                                            <button type="button" id="submit" name="submit" className="btn btn-danger w-100" onClick={handleBackNavigation}>Back</button>
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

export default EditUser