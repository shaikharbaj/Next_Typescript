"use client"
import Loader from '@/app/components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import styles from './styles.module.css'
import { deletecategoryAsync, loadCategoriesAsync } from '@/app/Redux/features/category/categorySlice';
import { RootState } from '@/app/Redux/store';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { successtoast } from '@/app/utils/alerts/alerts';
import Link from 'next/link';

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
            console.log(err);
        });
    }

    if (loading) {
        return <Loader />
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
                            {/* <th>
                            ParentCategory.
                        </th> */}
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((c: any, index) => {
                                return (
                                    <tr key={c.id}>
                                        <td>{index + 1}</td>
                                        <td>{c.name}</td>
                                        {/* <td>{c?.parent_id}</td> */}
                                        {/* <td><button className='btn btn-warning me-2' onClick={() => navigateToEdit(c.id)}>EDIT</button><button className='btn btn-danger me-2' onClick={() => deleteHandler(c.id)}>DELETE</button><button className='btn btn-success me-2' onClick={() => router.push(`/admin/dashboard/categories/${c.id}`)}>View</button></td> */}
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