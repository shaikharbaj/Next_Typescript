"use client"
import React, { useEffect } from 'react'
import styles from '../styles.module.css'
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader/Loader';
import { deletesubcategoryAsync, loadCategoriesAsync, loadSubcategoriesAsync, togglesubcategorystatusAsync } from '@/app/Redux/features/category/categorySlice';
import { RootState } from '@/app/Redux/store';
import Link from 'next/link';
import { errortoast, successtoast } from '@/app/utils/alerts/alerts';
const subcategories = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, subcategories } = useAppSelector((state: RootState) => state.category);

  const navigateToEdit = (id: number) => {
    router.push(`/admin/dashboard/categories/subcategories/edit/${id}`)
  }
  useEffect(() => {
    dispatch(loadSubcategoriesAsync()).unwrap().then((res) => {
    }).catch((err) => {
      console.log(err);
    });
  }, [])

  const deleteHandler = (id: number) => {
    if (confirm("are u sure?")) {
      dispatch(deletesubcategoryAsync(id)).unwrap().then((res) => {
        successtoast(res.message);
      }).catch((error) => {
        console.log(error);
      })
    }
  }
  const changeStatusToggle = (id: number) => {
    dispatch(togglesubcategorystatusAsync({id})).unwrap().then((res)=>{
          console.log(res);
          successtoast(res.message);
    }).catch((error)=>{
       console.log(error);
          errortoast(error.message);
    });
  }
  if (loading) {
    return <Loader />
  }
  return (
    <>
      <div className={styles.wrapper}>
        <div className={`${styles.add_btn_wrapper} mt-4`}>
          <button onClick={() => router.push("/admin/dashboard/categories/subcategories/add")}>ADD SUBCATEGORY.</button>
        </div>
        <table className={`${styles.custome_table} table text-center`}>
          <thead>
            <tr>
              <th>
                SR.NO
              </th>
              <th>
                SubCategory
              </th>
              <th>
                Parent category
              </th>
              <th>status</th>
              <th>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              subcategories.map((c: any, index: number) => {
                return (
                  <tr key={c.id}>
                    <td>{index + 1}</td>
                    <td>{c.name}</td>
                    <td>{c?.parent?.name}</td>
                    <td>{c?.subcategory_status
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
                    {/* <td>{c?.parent_id}</td> */}
                    {/* <td><button className='btn btn-warning me-2' onClick={() => navigateToEdit(c.id)}>EDIT</button><button className='btn btn-danger'>DELETE</button></td> */}
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
  )
}

export default subcategories;