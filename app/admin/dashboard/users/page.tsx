"use client"
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import styles from './style.module.css'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { RootState } from '@/app/Redux/store'
import useDebounce from '@/app/Hook/useDebounce'
import { loadAllUserAsync, togglestatus } from '@/app/Redux/features/user/userSlice'
import Loading from '@/app/components/Loading/Loading'
import Pagination from '@/app/components/Pagination/Pagination'
import Link from 'next/link'
import { errortoast, successtoast } from '@/app/utils/alerts/alerts'

type Role = {
    id: number,
    name: string
}
type userType = {
    id: number,
    name: string,
    email: string,
    role: Role,
    user_information: {
        date_of_birth: Date
        phone_number: number,
        street: string,
        city: string,
        state: string,
        zipcode: string,
        data_of_birth: Date
    }, status: boolean
}
const UsersPage = () => {
    const { users, meta, loading } = useAppSelector((state: RootState) => state.users);
    const { userinfo } = useAppSelector((state: RootState) => state.auth);
    const [searchTerm, setSerchText] = useState('');
    const debauncedValue = useDebounce(searchTerm, 600);
    const [currentpage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const dispatch = useAppDispatch();

    const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSerchText(e.target.value);
    }

    useEffect(() => {
        dispatch(loadAllUserAsync({ currentpage, searchTerm }))
    }, [debauncedValue, currentpage]);

    const changeStatusToggle = (id: number) => {
        if (confirm('are you sure?')) {
            dispatch(togglestatus(id)).unwrap().then((res) => {
                successtoast('status updated successfully')
            }).catch((err) => {
                errortoast(err);
            })
        }
    }
    console.log(users)
    return (
        <>
            {loading && <Loading />}
            <div className={styles.wrapper}>
                <div className={`${styles.inputbox}`}>
                    <input type="text" onChange={handlesearch} value={searchTerm} placeholder='search something here.....' />
                </div>
                <div className={styles.table_wrapper}>
                    <table className={`table table-bordered text-center`}>
                        <thead>
                            <tr>
                                <th>SR.NO</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                {/* <th>Date of Birth</th>
                                <th>phone number</th>
                                <th>street</th>
                                <th>city</th>
                                <th>state</th>
                                <th>zipcode</th> */}
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.length > 0 ? <>
                                    {
                                        users.map((u: userType, i: number) => {
                                            return <tr key={u.id}>
                                                <td>{perPage * (currentpage - 1) + (i + 1)}</td>
                                                <td>{u.name}</td>
                                                <td>{u.email}</td>
                                                <td><span className={styles.role_wrappere}>{u?.role?.name}</span></td>
                                                {/* <td> {u.user_information?.data_of_birth ? new Date(u?.user_information?.data_of_birth).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) : null}</td>
                                                <td>{u?.user_information?.phone_number}</td>
                                                <td>{u?.user_information?.street}</td>
                                                <td>{u.user_information?.city}</td>
                                                <td>{u.user_information?.state}</td>
                                                <td>{u.user_information?.zipcode}</td> */}
                                                <td>{u.status ? (
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={() => changeStatusToggle(u?.id)} checked />
                                                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Active</label>
                                                    </div>
                                                ) : (

                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={() => changeStatusToggle(u?.id)} checked={false} />
                                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">InActive</label>
                                                    </div>

                                                )}</td>
                                                <td><Link href={`/admin/dashboard/users/profile/${u?.id}`} className='me-3'><i className='bx bxs-show show'></i></Link>{userinfo?.role?.name === "ADMIN" ? <Link href={`/admin/dashboard/users/edit/${u.id}`}><i className='bx bxs-edit edit'></i></Link> : null}</td>
                                            </tr>
                                        })
                                    }
                                </> : <>
                                    <tr>
                                        <td colSpan={6}>No Data found</td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination currentpage={currentpage} setCurrentPage={setCurrentPage} total={meta?.total} perpage={perPage} />
            </div>
        </>
    )
}

export default UsersPage;