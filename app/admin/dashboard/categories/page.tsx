"use client"
import Loader from '@/app/components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import styles from './styles.module.css'
import { deletecategoryAsync, loadCategoriesAsync, togglecategorystatusAsync } from '@/app/Redux/features/category/categorySlice';
import { RootState } from '@/app/Redux/store';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { errortoast, successtoast } from '@/app/utils/alerts/alerts';
import Link from 'next/link';
import Loading from '@/app/components/Loading/Loading';

const Category = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, categories } = useAppSelector((state: RootState) => state.category);
    const navigateToEdit = (id: number) => {
        router.push(`/admin/dashboard/categories/edit/${id}`)
    }
    useEffect(() => {
        dispatch(loadCategoriesAsync()).unwrap().then((res) => {

        }).catch((err) => {
            console.log(err);
        });
    }, [])

    const deleteHandler = (id: number) => {
        dispatch(deletecategoryAsync(id)).unwrap().then((res) => {
            successtoast(res?.message);
        }).catch((err) => {
            errortoast(err.message);
        });
    }
    const changeStatusToggle = (id: number) => {
             dispatch(togglecategorystatusAsync({id})).unwrap().then((res)=>{
                   console.log(res);
                   successtoast(res.message);
             }).catch((error)=>{
                console.log(error);
                   errortoast(error.message);
             });
    }

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <div className={styles.wrapper}>
                <div className={`${styles.add_btn_wrapper} mt-4`}>
                    <button className='me-2' onClick={() => router.push("/admin/dashboard/categories/add")}>ADD CATEGORY.</button>

                </div>
                <table className={`${styles.custome_table} table text-center`}>
                    <thead>
                        <tr>
                            <th>
                                SR.NO
                            </th>
                            <th>
                                Cateogry Name
                            </th>
                            <th>
                                status
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((c: any, index:number) => {
                                return (
                                    <tr key={c.id}>
                                        <td>{index + 1}</td>
                                        <td>{c.name}</td>
                                        <td>{c.category_status
                                            ? (
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input check_bx" type="checkbox" id="flexSwitchCheckChecked" onChange={() => changeStatusToggle(c?.id)} checked />
                                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Active</label>
                                                </div>
                                            ) : (

                                                <div className="form-check form-switch">
                                                    <input className="form-check-input check_bx" type="checkbox" id="flexSwitchCheckDefault" onChange={() => changeStatusToggle(c?.id)} checked={false} />
                                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">InActive</label>
                                                </div>

                                            )}</td>
                                        <td>
                                            <Link href={`/admin/dashboard/categories/subcategories/edit/${c.id}`} className='me-2'><i className='bx bxs-edit edit '></i></Link>
                                            <span onClick={() => deleteHandler(c?.id)}><i className='bx bxs-trash delete me-2'></i></span>
                                            <Link href={`/admin/dashboard/categories/${c.id}`} className='me-2'><i className='bx bx-show show'></i></Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>


        </>
    )
}

export default Category;