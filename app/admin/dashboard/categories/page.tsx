"use client"
import Loader from '@/app/components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import styles from './styles.module.css'
import { loadCategoriesAsync } from '@/app/Redux/features/category/categorySlice';
import { RootState } from '@/app/Redux/store';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const Category = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, categories } = useAppSelector((state: RootState) => state.category);

    const navigateToEdit=(id:number)=>{
        router.push(`/admin/dashboard/categories/edit/${id}`)
    }
    useEffect(() => {
        dispatch(loadCategoriesAsync()).unwrap().then((res) => {

        }).catch((err) => {
            console.log(err);
        });
    }, [])
    if (loading) {
        return <Loader />
    }
    return (
        <>
            <div className={styles.wrapper}>
                <div className={`${styles.add_btn_wrapper} mt-4`}>
                    <button className='me-2' onClick={() => router.push("/admin/dashboard/categories/add")}>ADD CATEGORY.</button>
                    <button onClick={() => router.push("/admin/dashboard/categories/subcategories/add")}>ADD SUBCATEGORY.</button>
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
                                        <td><button className='btn btn-warning me-2' onClick={()=>navigateToEdit(c.id)}>EDIT</button><button className='btn btn-danger'>DELETE</button></td>
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