"use client"
import styles from './user.module.css'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Hook/hooks';
import useDebounce from '../Hook/useDebounce';
import Pagination from '../components/Pagination/Pagination';
import Loading from '../components/Loading/Loading';
import { loadAllUserAsync } from '../Redux/features/user/userSlice';

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
    const { users, meta, loading } = useAppSelector(state => state.users);
    const [searchTerm, setSerchText] = useState('');
    const debauncedValue = useDebounce(searchTerm, 600);
    const [currentpage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const dispatch = useAppDispatch();

    const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSerchText(e.target.value);
    }

    useEffect(() => {
        dispatch(loadAllUserAsync({ currentpage, searchTerm }))
    }, [debauncedValue]);
    console.log(users && users[1]?.user_information?.data_of_birth ? new Date(users[1]?.user_information?.data_of_birth).toLocaleDateString() : null)
    return (
        <>
            <h1>All Registered Users....</h1>
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
                                            <td> {u.user_information?.data_of_birth ? new Date(users[1]?.user_information?.data_of_birth).toLocaleDateString() : null}</td>
                                            <td>{u?.user_information?.phone_number}</td>
                                            <td>{u?.user_information?.street}</td>
                                            <td>{u.user_information?.city}</td>
                                            <td>{u.user_information?.state}</td>
                                            <td>{u.user_information?.zipcode}</td>
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
                {/* <Pagination currentpage={currentpage} setCurrentPage={setCurrentPage} total={users?.total} perpage={perPage} /> */}
            </div>
        </>
    )
}

export default UsersPage