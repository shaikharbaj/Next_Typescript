"use client"
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks';
import { deletesubcategoryAsync, loadsubcategoriesofsingleCategory } from '@/app/Redux/features/category/categorySlice';
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/navigation';
import { successtoast } from '@/app/utils/alerts/alerts';
import { RootState } from '@/app/Redux/store';
import Link from 'next/link';
const Allsubcategories = ({ id }: { id: number }) => {
    const dispatch = useAppDispatch();
    const { subcategories } = useAppSelector((state: RootState) => state.category);
    // const [subcategories, setSubcategories] = useState([]);
    const router = useRouter();
    useEffect(() => {
        dispatch(loadsubcategoriesofsingleCategory(id)).unwrap().then((res) => {
            // setSubcategories(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    const navigateToEdit = (id: number) => {
        router.push(`/admin/dashboard/categories/subcategories/edit/${id}`)
    }
    const deleteHandler = (id: number) => {
        if (confirm("are u sure?")) {
            dispatch(deletesubcategoryAsync(id)).unwrap().then((res) => {
                successtoast(res.message);
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    return (
        <>
            <>
                <div className={styles.wrapper}>
                    <div className={`${styles.add_btn_wrapper} mt-4`}>
                        <h4>ALL SubCategories</h4>
                    </div>
                    <table className={`${styles.custome_table} table text-center`}>
                        <thead>
                            <tr>
                                <th>
                                    SR.NO
                                </th>
                                <th>
                                    Subcategory Name
                                </th>
                                <th>
                                    Parent Category
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                subcategories.length > 0 && subcategories.map((c: any, index) => {
                                    return (
                                        <tr key={c.id}>
                                            <td>{index + 1}</td>
                                            <td>{c.name}</td>
                                            <td>{c?.parent?.name}</td>
                                            <td>
                                                <Link href={`/admin/dashboard/categories/subcategories/edit/${c.id}`} className='me-2'><i className='bx bxs-edit edit '></i></Link>
                                                <span onClick={() => deleteHandler(c?.id)}><i className='bx bxs-trash delete'></i></span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </>
        </>
    )
}

export default Allsubcategories