"use client"
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import styles from './style.module.css'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { RootState } from '@/app/Redux/store'
import useDebounce from '@/app/Hook/useDebounce'
import { loadAllUserAsync } from '@/app/Redux/features/user/userSlice'
import Loading from '@/app/components/Loading/Loading'
import Pagination from '@/app/components/Pagination/Pagination'
import Link from 'next/link'


type userType = {
    id: number,
    name: string,
    email: string,
    user_information: {
        date_of_birth: Date
        phone_number: number,
        street: string,
        city: string,
        state: string,
        zipcode: string,
        data_of_birth: Date
    }
}
const UsersPage = () => {
    const { users, meta, loading } = useAppSelector((state: RootState) => state.users);
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
    return (
        <>
            {loading && <Loading />}
            <div className={styles.wrapper}>
                <div className={`mt-3 mb-3 ${styles.inputbox}`}>
                    <input type="text" onChange={handlesearch} value={searchTerm} placeholder='search something here.....' />
                </div>
                <table className={`table ${styles.custome_table} table-bordered`}>
                    <thead>
                        <tr>
                            <th>SR.NO</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>phone number</th>
                            <th>street</th>
                            <th>city</th>
                            <th>state</th>
                            <th>zipcode</th>
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
                                            <td> {u.user_information?.data_of_birth ? new Date(u?.user_information?.data_of_birth).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) : null}</td>
                                            <td>{u?.user_information?.phone_number}</td>
                                            <td>{u?.user_information?.street}</td>
                                            <td>{u.user_information?.city}</td>
                                            <td>{u.user_information?.state}</td>
                                            <td>{u.user_information?.zipcode}</td>
                                            <td>true</td>
                                            <td><Link href="/admin" className='me-4'>View</Link><Link href={`/admin/dashboard/users/edit/${u.id}`}>Edit</Link></td>
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

                <Pagination currentpage={currentpage} setCurrentPage={setCurrentPage} total={meta?.total} perpage={perPage} />
            </div>
        </>
    )
}

export default UsersPage;